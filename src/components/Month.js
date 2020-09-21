import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "semantic-ui-css/semantic.min.css";



const useStyles = makeStyles((theme) => ({

    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto'
      },
  }));

const Month = (props) => {
    const classes = useStyles();
    const [openAddEvent, setOpenAddEvent] = React.useState(false)

    const [newStartDate, setNewStartDate] = React.useState("")
    const [newEndingDate, setNewEndingDate] = React.useState("")
    const [newNotes, setNewNotes] = React.useState("")
    const [newTitle, setNewTitle] = React.useState("")
    const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId)) 

    const [eventType, setEventType] = React.useState("")

    const [renderCalendarEvents, setCalendarEvents] = React.useState([])

    const [updatingEvent, toggleUpdatingEvent] = React.useState(false)
    const [updateId, setUpdateId] = React.useState('')


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverDisplay, setPopoverDisplay] = React.useState([])


    React.useEffect( () => {
        grabEvents()
    }, [props.user_events])

    const grabEvents = () => {
        setCalendarEvents([])
        if (props.daily_posts) {
            props.daily_posts.map(post => setCalendarEvents(prevState => [...prevState, {title: 'DAILY POST', 
            date: post.date, id: "daily post", extendedProps: {post: post, mood: post.mood}, color: post.mood.hexcode, display: 'background'}]))
        }
        if (props.holidays) {
            props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, 
            date: event['start_date'], id: "holiday", borderColor: "#000000"}]))
        }
        if (props.user_events) {
            props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, 
            start: event['start_date'], end: event['end_date'], id: event.event_type, extendedProps: {notes: event.notes, eventId: event.id},

            backgroundColor: getEventBGColor(event)}]))
        }
    }

    const getEventBGColor = (eventForCal) => {
        if (eventForCal.event_type === "Birthday") {
            return "#8075bb"
        } else if (eventForCal.event_type === "Work") {
            return "#66984b"
        } else if (eventForCal.event_type === "Personal") {
            return "#f08c2f"
        } else if (eventForCal.event_type === "School") {
            return "#2290da"
        } else if (eventForCal.event_type === "Other") {
            return "#da2290"
        }
    }

    

    const createNewEvent = (e) => {
        e.preventDefault()
        let info = {
            title: newTitle,
            start_date: newStartDate,
            end_date: newEndingDate,
            notes: newNotes,
            user_id: userId,
            event_type: eventType
        }
        console.log(info)
        
        props.addEventForUser(e, info)
    
        toggleCloseModal()
    }
 
    const handleDateClick = (arg) => {
        console.log(arg.dateStr, "- render DATE modal")
        console.log(arg)
        setNewStartDate(arg.dateStr)
    }

    const handleSelection = (arg) => {
        setNewStartDate(arg.startStr)
        setNewEndingDate(arg.endStr)
        toggleUpdatingEvent(false)

        setOpenAddEvent(true)
    }

    const handleEventClick = (arg) => {
        
        console.log(arg.event._def.extendedProps.eventId) // grabs event Id
        let eventId = parseInt(arg.event._def.extendedProps.eventId, 10)
        setUpdateId(eventId)
        let updateEventObj
        if (arg.event._def.publicId === "holiday") {
            setSnackMsg("Sorry! You can't update holidays")
            setOpenSnack(true)
        } else if (arg.event._def.publicId === "daily post") { 
            setSnackMsg("Sorry! You can't update daily posts from here")
            setOpenSnack(true)
        } else {
        props.user_events.map(event => {if (event.id === eventId) {updateEventObj = event}})
        
        setNewTitle(updateEventObj.title)
        setNewStartDate(updateEventObj.start_date)
        if (updateEventObj.end_date) {setNewEndingDate(updateEventObj.end_date)} else {setNewEndingDate("")}
        if (updateEventObj.notes) {setNewNotes(updateEventObj.notes)} else {setNewNotes("")}
        setEventType(updateEventObj.event_type)
        toggleUpdatingEvent(true)
        setOpenAddEvent(true)
        }
    
    }

    const updateEvent = (e) => {
        e.preventDefault()
        let info = {
            title: newTitle,
            start_date: newStartDate,
            end_date: newEndingDate,
            notes: newNotes,
            user_id: userId,
            event_type: eventType
        }
        console.log(info)
        props.updateEvent(e, info, updateId)
        toggleCloseModal()
    }

    const deleteEvent = (e) => {
        console.log(updateId)
        props.destroyEvent(e, updateId)
        toggleCloseModal()
    }

    const toggleCloseModal = () => {
        setOpenAddEvent(false)
        toggleUpdatingEvent(false)
        setNewTitle("")
        setNewStartDate("")
        setNewEndingDate("")
        setNewNotes("")
        setEventType("")
    }


    const renderDeleteButton = () => {
            {return <div>
            <Button basic color="red" inverted onClick={(e) => deleteEvent(e)}>
            <Icon name='remove' /> DELETE </Button>
            </div>}
    }

    const handleNavLinkClick = (e) => {
        setPopoverDisplay([])

        renderCalendarEvents.map( event => {
            if (event.id !== "daily post") { 
                if (event.date === e.toISOString().substring(0, 10) || event.start === e.toISOString().substring(0, 10)) {
                    setPopoverDisplay(prevState => [...prevState, event])
                }
            }
        })

        if (popoverDisplay) {setAnchorEl(true)}
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
        setPopoverDisplay([])
    }
    
    const popoverOpen = Boolean(anchorEl)

    const [openSnack, setOpenSnack] = React.useState(false)
    const [snackMsg, setSnackMsg] = React.useState("")

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setOpenSnack(false);
    };


    if (localStorage.loggedIn) {
    return (
        <div>
            <Modal
                basic
                onClose={() => toggleCloseModal()}
                // onClose={() => setOpenAddEvent(false)}
                onOpen={() => setOpenAddEvent(true)}
                open={openAddEvent}
                size='small'
                className="modal"
                // trigger={<Button>Basic Modal</Button>}
                >
                <Header icon>
                    <Icon name='calendar' />
                    {updatingEvent ? "Update This Event" : "Add a New Event To Your Calendar!"}
                </Header>
                
                <Modal.Content>
                    <div>
                        <form className="ui form" >
                            <div className="field">
                                <p>Title*</p>
                                <input name="title" placeholder="e.g., Someone's Birthday" value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>What type of event is this?*</p>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Choose One</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                        label="Event Types"
                                    >
                                    <MenuItem value={"Birthday"}>Birthday</MenuItem>
                                    <MenuItem value={"Work"}>Work</MenuItem>
                                    <MenuItem value={"Personal"}>Personal</MenuItem>
                                    <MenuItem value={"School"}>School</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="field">
                                <p>Start Date (YYYY/MM/DD)*</p>
                                <input name="start" placeholder="e.g., 2020/08/30" value={newStartDate}
                                onChange={(e) => setNewStartDate(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>End Date, if applicable (YYYY/MM/DD)*</p>
                                <input name="end" placeholder="e.g., 2020/08/31" value={newEndingDate}
                                onChange={(e) => setNewEndingDate(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>Notes</p>
                                <input name="notes" placeholder="e.g., 'Remember to pack your toiletries!'" value={newNotes}
                                onChange={(e) => setNewNotes(e.target.value)}></input>
                            </div>
                            <br /> 
                         </form>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    

                    <Button basic color='yellow' inverted onClick={() => toggleCloseModal()}>
                    <Icon name='remove' /> Cancel/Close
                    </Button>

                    { updatingEvent ? <Button color="red" inverted onClick={(e) => deleteEvent(e)}>
                            <Icon name='remove' /> DELETE </Button> : null }

                    <Button color='green' inverted type="submit" value="submit"
                    onClick={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}>
                            <Icon name='checkmark' /> {updatingEvent ? "Update Event!" : "Add Event!"}
                    </Button>
                </Modal.Actions>
                    
            </Modal>

        <Container fixed>
        <div className={classes.root.flexGrow}>
        <Grid container spacing={3}>
            <Grid item sm={12}>
                <Paper className={classes.paper}>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                        initialView="dayGridMonth"
                        selectable={true}
                        timeZone="UTC"
                        forceEventDuration={true}
                        // dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        select={handleSelection}
                        headerToolbar={{
                            right: 'prev,next',
                            center: 'title',
                            left: 'today,dayGridMonth,timeGridWeek'
                        }}
                        navLinks={true} // new code? 
                        navLinkDayClick={handleNavLinkClick}
                        events={renderCalendarEvents}
                        // textColor='#000000'
                        eventColor='#909090'
                        dayMaxEventRows={true}
                        dayMaxEvents={true}
                        moreLinkClick="popover"

                    />
                </Paper>
            </Grid>
        </Grid>
        </div>
        </Container>
        {/* POPOVER FOR EVENT DISPLAY */}
            {anchorEl ? <div><Popover id='mouse-over-popover' className={classes.popover}
                            classes={{paper: classes.paper}} open={popoverOpen} anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            transformOrigin={{vertical: 'top', horizontal:'left'}} 
                            onClose={handlePopoverClose} disableRestoreFocus> 
                               
                                {popoverDisplay.map(event => <div>
                                    Title: {event.title} <br/>

                                </div>)}
                                <Button onClick={() => handlePopoverClose()} basic size="tiny" > Close </Button>
                            </Popover> </div> : null }

            <div> {/*div for snackbar */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openSnack}
                autoHideDuration={4000}
                message={snackMsg}
                onClose={handleSnackClose}
                action={
                    <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleSnackClose()}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    </React.Fragment>
                }
            />
            </div>
        </div>
    ) }  else {
        alert("Sorry, you must be logged in to see your monthly calendar!")
        return ( <Redirect to="/" /> )
    }
}

const mapStateToProps = state => {
    return {
        holidays: state.holidays,
        user_events: state['user_events'],
        daily_posts: state['daily_posts']
    }
}


export default connect(mapStateToProps)(Month)
