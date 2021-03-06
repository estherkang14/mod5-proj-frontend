// GET RID OF THIS COMPONENT

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Week = (props) => {
    const classes = useStyles();
    const [openAddEvent, setOpenAddEvent] = React.useState(false)

    const [newStartDate, setNewStartDate] = React.useState("")
    const [newEndingDate, setNewEndingDate] = React.useState("")
    const [newNotes, setNewNotes] = React.useState("")
    const [newTitle, setNewTitle] = React.useState("")
    const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId))
    const [eventType, setEventType] = React.useState("")

    const [renderCalendarEvents, setCalendarEvents] = React.useState([])

    React.useEffect( () => {
        if (props.holidays) {
            props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date']}]))
        }
        if (props.user_events) {
            props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, date: event['start_date']}]))
        }
    }, [])

    const createNewEvent = (e) => {
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
        
        // props to add new event 
        setOpenAddEvent(false)
    }
 
    const handleDateClick = (arg) => {
        console.log(arg.dateStr, "- render DATE modal")
        console.log(props.user_events)
        console.log(renderCalendarEvents)
    }

    const addEvent = (e) => {
        console.log('clicked add event button. render add event modal here')
    }



    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridWeek"
                dateClick={handleDateClick}
                customButtons={{
                    addEventButton: {
                        text: 'Add Event',
                        click: () => setOpenAddEvent(true)
                    }
                }}
                headerToolbar={{
                    right: 'addEventButton',
                    center: 'title',
                    left: 'today listMonth prev,next'
                }}
                events={renderCalendarEvents}

            />

            {/* Modal for Adding an Event - form */}
            <Modal
                basic
                onClose={() => setOpenAddEvent(false)}
                onOpen={() => setOpenAddEvent(true)}
                open={openAddEvent}
                size='small'
                // trigger={<Button>Basic Modal</Button>}
                >
                <Header icon>
                    <Icon name='calendar' />
                    Add a New Event To Your Calendar!
                </Header>
                <Modal.Content>
                    <div>
                        <form className="ui form">
                            <div className="field">
                                <p>Title</p>
                                <input name="title" placeholder="e.g., Someone's Birthday"
                                onChange={(e) => setNewTitle(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>What type of event is this?</p>
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
                                <p>Start Date (YYYY/MM/DD)</p>
                                <input name="start" placeholder="e.g., 2020/08/30"
                                onChange={(e) => setNewStartDate(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>End Date, in applicable (YYYY/MM/DD)</p>
                                <input name="end" placeholder="e.g., 2020/08/31"
                                onChange={(e) => setNewEndingDate(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>Notes</p>
                                <input name="notes" placeholder="e.g., 'Remember to pack your toiletries!'"
                                onChange={(e) => setNewNotes(e.target.value)}></input>
                            </div>
                            <br />
                        </form>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenAddEvent(false)}>
                    <Icon name='remove' /> Cancel/Close
                    </Button>
                    <Button color='green' inverted onClick={(e) => createNewEvent(e)}>
                    <Icon name='checkmark' /> Add Event!
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        holidays: state.userReducer.holidays,
        user_events: state.userReducer['user_events']
    }
}

export default connect(mapStateToProps)(Week)
