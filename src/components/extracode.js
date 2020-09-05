// import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; 
// import { connect } from 'react-redux'
// import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// // import bootstrapPlugin from '@fullcalendar/bootstrap'; //new code
// import { Redirect } from 'react-router-dom'

// import "semantic-ui-css/semantic.min.css";


// import 'bootstrap/dist/css/bootstrap.css'; //new code
// import '@fortawesome/fontawesome-free/css/all.css'; //new code

// const useStyles = makeStyles((theme) => ({
//     // formControl: {
//     //   margin: theme.spacing(1),
//     //   minWidth: 120,
//     // },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

// const Month = (props) => {
//     const classes = useStyles();
//     const [openAddEvent, setOpenAddEvent] = React.useState(false)

//     const [newStartDate, setNewStartDate] = React.useState("")
//     const [newEndingDate, setNewEndingDate] = React.useState("")
//     const [newNotes, setNewNotes] = React.useState("")
//     const [newTitle, setNewTitle] = React.useState("")
//     const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId)) 

//     const [eventType, setEventType] = React.useState("")

//     const [renderCalendarEvents, setCalendarEvents] = React.useState([])

//     const [calenderCellColors, setCalendarCellColors] = React.useState([])

//     const [updatingEvent, toggleUpdatingEvent] = React.useState(false)
//     const [updateId, setUpdateId] = React.useState('')

   

//     React.useEffect( () => {
//         // if (props.holidays) {
//         //     props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date'], id: "holiday"}]))
//         // }
//         // if (props.user_events) {
//         //     props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, start: event['start_date'], end: event['end_date'], id: event.id}]))
//         // }
//         // if (props.daily_posts) {
//         //     props.daily_posts.map(post => setCalendarCellColors(prevState => [...prevState]))
//         // }
//         // console.log("hello 2") 

//         grabEvents()
//     }, [])
//     // props.user_events)

//     const grabEvents = () => {
//         setCalendarEvents([])
//         if (props.holidays) {
//             props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date'], id: "holiday"}]))
//         }
//         if (props.user_events) {
//             props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, start: event['start_date'], 
//             end: event['end_date'], id: event.id, extendedProps: event.notes}]))
//         }
//         // if (props.daily_posts) {
//         //     props.daily_posts.map(post => setCalendarCellColors(prevState => [...prevState]))
//         // }

//         console.log("grabEvents")
//     }

    

//     const createNewEvent = (e) => {
//         e.preventDefault()
//         let info = {
//             title: newTitle,
//             start_date: newStartDate,
//             end_date: newEndingDate,
//             notes: newNotes,
//             user_id: userId,
//             event_type: eventType
//         }
//         console.log(info)
        
//         props.addEventForUser(e, info)
    
//         // grabEvents()
        
//         setOpenAddEvent(false)
//         // setNewTitle("")
//         // setNewStartDate("")
//         // setNewEndingDate("")
//         // setNewNotes("")
//         // setEventType("")
//         // grabEvents()
//     }
 
//     const handleDateClick = (arg) => {
//         console.log(arg.dateStr, "- render DATE modal")
//         console.log(arg)
//         // let eventDate
//         // if (arg.allDay === true) {
//         //     eventDate = arg.dateStr + "00"
//         // }
//         setNewStartDate(arg.dateStr)
//     }

//     const handleSelection = (arg) => {
//         console.log(arg)
//         console.log(arg.start)
//         setNewStartDate(arg.startStr)
//         setNewEndingDate(arg.endStr)

//         setOpenAddEvent(true)
//     }

//     const handleEventClick = (arg) => {
//         console.log(arg.event)
//         console.log(arg.event._def.title)
//         console.log(arg.event._def.publicId) // grabs event Id
//         let eventId = parseInt(arg.event._def.publicId, 10)
//         setUpdateId(eventId)
//         let updateEventObj
//         // make these alerts into snackboxes 
//         if (arg.event._def.publicId === "holiday") {alert("Sorry! You can't update holidays")} else {
//         props.user_events.map(event => {if (event.id === eventId) {updateEventObj = event}})
//         console.log(updateEventObj)
        
//         setNewTitle(updateEventObj.title)
//         setNewStartDate(updateEventObj.start_date)
//         if (updateEventObj.end_date) {setNewEndingDate(updateEventObj.end_date)} else {setNewEndingDate("")}
//         if (updateEventObj.notes) {setNewNotes(updateEventObj.notes)} else {setNewNotes("")}
//         setEventType(updateEventObj.event_type)
//         toggleUpdatingEvent(true)
//         setOpenAddEvent(true)
//         }
    
//     }

//     const updateEvent = (e) => {
//         e.preventDefault()
//         console.log("hello i'm going to update!")
//         let info = {
//             title: newTitle,
//             start_date: newStartDate,
//             end_date: newEndingDate,
//             notes: newNotes,
//             user_id: userId,
//             event_type: eventType
//         }
//         console.log(info)
//         props.updateEvent(e, info, updateId)
//         // grabEvents()

//         // setNewTitle("")
//         // setNewStartDate("")
//         // setNewEndingDate("")
//         // setNewNotes("")
//         // setEventType("")
//         toggleUpdatingEvent(false)
//         setOpenAddEvent(false)
//     }

//     // const toggleCloseModal = () => {
//     //     setOpenAddEvent(false)
//     //     toggleUpdatingEvent(false)
//     //     setNewTitle("")
//     //     setNewStartDate("")
//     //     setNewEndingDate("")
//     //     setNewNotes("")
//     //     setEventType("")
//     // }

//     const handleEventStartChange = (info) => {
//         console.log(info)
//     }


//     if (localStorage.loggedIn) {
//     return (
//         <div>
//             <Modal
//                 basic
//                 // onSubmit={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}
//                 onClose={() => setOpenAddEvent(false)}
//                 // onClose={() => setOpenAddEvent(false)}
//                 onOpen={() => setOpenAddEvent(true)}
//                 open={openAddEvent}
//                 size='small'
//                 trigger={<Button>Basic Modal</Button>}
//                 >
//                 <Header icon>
//                     <Icon name='calendar' />
//                     {updatingEvent ? "Update This Event" : "Add a New Event To Your Calendar!"}
//                 </Header>
                
//                 <Modal.Content>
                    
                            
//                         {/* <Form.input name="Title" placeholder="e.g., Someone's Birthday" value={newTitle}
//                         onChange={(e) => setNewTitle(e.target.value)}/>

//                         <FormControl variant="outlined" className={classes.formControl}>
//                             <InputLabel id="demo-simple-select-outlined-label">Choose One</InputLabel>
//                             <Select
//                                 labelId="demo-simple-select-outlined-label"
//                                 id="demo-simple-select-outlined"
//                                 value={eventType}
//                                 onChange={(e) => setEventType(e.target.value)}
//                                 label="Event Types"
//                             >
//                             <MenuItem value={"Birthday"}>Birthday</MenuItem>
//                             <MenuItem value={"Work"}>Work</MenuItem>
//                             <MenuItem value={"Personal"}>Personal</MenuItem>
//                             <MenuItem value={"School"}>School</MenuItem>
//                             <MenuItem value={"Other"}>Other</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <Form.input name="Start Date (YYYY/MM/DD)" placeholder="e.g., 2020/08/30" value={newStartDate}
//                             onChange={(e) => setNewStartDate(e.target.value)} />

//                         <Form.input name="End Date, if applicable (YYYY/MM/DD)" placeholder="e.g., 2020/08/31" value={newEndingDate}
//                             onChange={(e) => setNewEndingDate(e.target.value)} />

//                         <Form.input name="Notes" placeholder="e.g., 'Remember to pack your toiletries!'" value={newNotes}
//                             onChange={(e) => setNewNotes(e.target.value)} /> */}
 
                   
//                     <div>
//                         {/* <form className="ui form" onSubmit={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}> */}
//                         <form className="ui form" >

//                             <div className="field">
//                                 <p>Title</p>
//                                 <input name="title" placeholder="e.g., Someone's Birthday" value={newTitle}
//                                 onChange={(e) => setNewTitle(e.target.value)}></input>
//                             </div>
//                             <br />

//                             <div className="field">
//                                 <p>What type of event is this?</p>
//                                 <FormControl variant="outlined" className={classes.formControl}>
//                                     <InputLabel id="demo-simple-select-outlined-label">Choose One</InputLabel>
//                                     <Select
//                                         labelId="demo-simple-select-outlined-label"
//                                         id="demo-simple-select-outlined"
//                                         value={eventType}
//                                         onChange={(e) => setEventType(e.target.value)}
//                                         label="Event Types"
//                                     >
//                                     <MenuItem value={"Birthday"}>Birthday</MenuItem>
//                                     <MenuItem value={"Work"}>Work</MenuItem>
//                                     <MenuItem value={"Personal"}>Personal</MenuItem>
//                                     <MenuItem value={"School"}>School</MenuItem>
//                                     <MenuItem value={"Other"}>Other</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </div>

//                             <div className="field">
//                                 <p>Start Date (YYYY/MM/DD)</p>
//                                 <input name="start" placeholder="e.g., 2020/08/30" value={newStartDate}
//                                 onChange={(e) => setNewStartDate(e.target.value)}></input>
//                             </div>
//                             <br />

//                             <div className="field">
//                                 <p>End Date, if applicable (YYYY/MM/DD)</p>
//                                 <input name="end" placeholder="e.g., 2020/08/31" value={newEndingDate}
//                                 onChange={(e) => setNewEndingDate(e.target.value)}></input>
//                             </div>
//                             <br />

//                             <div className="field">
//                                 <p>Notes</p>
//                                 <input name="notes" placeholder="e.g., 'Remember to pack your toiletries!'" value={newNotes}
//                                 onChange={(e) => setNewNotes(e.target.value)}></input>
//                             </div>
//                             <br /> 
//                             {/* <Modal.Actions>
//                                 <Button basic color='red' inverted onClick={() => toggleCloseModal()}>
                                
//                                 <Icon name='remove' /> Cancel/Close
//                                 </Button>
//                                 <Button color='green' inverted type="submit" value="submit"
//                                 // onClick={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}
//                                 >
//                                 <Icon name='checkmark' /> {updatingEvent ? "Update Event!" : "Add Event!"}
//                                 </Button>
//                             </Modal.Actions> */}
//                             {/* <input type="submit" className="ui fluid button"/> */}


//                          </form>
//                     </div>
//                 </Modal.Content>
//                 <Modal.Actions>
//                     <Button basic color='red' inverted onClick={() => setOpenAddEvent(false)}>
//                     <Icon name='remove' /> Cancel/Close
//                     </Button>
//                     <Button color='green' inverted type="submit" value="submit"
//                     onClick={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}>
//                             <Icon name='checkmark' /> {updatingEvent ? "Update Event!" : "Add Event!"}
//                     </Button>
//                 </Modal.Actions>
                    
//             </Modal>

//             <FullCalendar
//                 plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
//                 initialView="dayGridMonth"
//                 // themeSystem='bootstrap'
//                 selectable={true}
//                 timeZone="UTC"
//                 forceEventDuration={true}
//                 // dateClick={handleDateClick}
//                 eventClick={handleEventClick}
//                 select={handleSelection}
//                 // customButtons={{
//                 //     addEventButton: {
//                 //         text: 'Add Event',
//                 //         click: () => setOpenAddEvent(true)
//                 //     }
//                 // }}
//                 headerToolbar={{
//                     right: 'addEventButton prev,next',
//                     center: 'title',
//                     left: 'today,dayGridMonth,timeGridWeek'
//                 }}
//                 // navLinks={true} // new code? 
//                 events={renderCalendarEvents}
//                 eventColor='#808080'
//                 dayMaxEventRows={true}
//                 dayMaxEvents={true}
//                 // editable={true}
//                 // eventDragStart={handleEventStartChange()}
//                 moreLinkClick="popover"
//                 // dayCellClassNames={(arg) => console.log(arg)}

//             />

//             {/* Modal for Adding an Event - form */}
            
//         </div>
//     ) }  else {
//         alert("Sorry, you must be logged in to see your monthly calendar!")
//         return ( <Redirect to="/" /> )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         holidays: state.userReducer.holidays,
//         user_events: state.userReducer['user_events'],
//         rerender: state.userReducer.rerender,
//         daily_posts: state.userReducer['daily_posts']
//     }
// }


// export default connect(mapStateToProps)(Month)


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
// import bootstrapPlugin from '@fullcalendar/bootstrap'; //new code
import { Redirect } from 'react-router-dom'

import "semantic-ui-css/semantic.min.css";


import 'bootstrap/dist/css/bootstrap.css'; //new code
import '@fortawesome/fontawesome-free/css/all.css'; //new code

const useStyles = makeStyles((theme) => ({
    // formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 120,
    // },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Month = (props) => {
    const classes = useStyles();
    const [openAddEvent, setOpenAddEvent] = React.useState(false)
    const [openUpdateEvent, setOpenUpdateEvent] = React.useState(false)

    const [newStartDate, setNewStartDate] = React.useState("")
    const [newEndingDate, setNewEndingDate] = React.useState("")
    const [newNotes, setNewNotes] = React.useState("")
    const [newTitle, setNewTitle] = React.useState("")
    const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId)) 

    const [updateStartDate, setUpdateStartDate] = React.useState("")
    const [updateEndingDate, setUpdateEndDate] = React.useState("")
    const [updateNotes, setUpdateNotes] = React.useState("")
    const [updateTitle, setUpdateTitle] = React.useState("")
    const [updateEventType, setUpdateEventType] = React.useState("")

    const [eventType, setEventType] = React.useState("")

    const [renderCalendarEvents, setCalendarEvents] = React.useState([])

    const [calenderCellColors, setCalendarCellColors] = React.useState([])

    const [updatingEvent, toggleUpdatingEvent] = React.useState(false)
    const [updateId, setUpdateId] = React.useState('')

   

    React.useEffect( () => {
        // if (props.holidays) {
        //     props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date'], id: "holiday"}]))
        // }
        // if (props.user_events) {
        //     props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, start: event['start_date'], end: event['end_date'], id: event.id}]))
        // }
        // if (props.daily_posts) {
        //     props.daily_posts.map(post => setCalendarCellColors(prevState => [...prevState]))
        // }
        // console.log("hello 2") 

        grabEvents()
    }, [])
    // props.user_events)

    const grabEvents = () => {
        setCalendarEvents([])
        if (props.holidays) {
            props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date'], id: "holiday"}]))
        }
        if (props.user_events) {
            props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, start: event['start_date'], 
            end: event['end_date'], id: event.id, extendedProps: event.notes}]))
        }
        // if (props.daily_posts) {
        //     props.daily_posts.map(post => setCalendarCellColors(prevState => [...prevState]))
        // }

        console.log("grabEvents")
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
    
        // grabEvents()
        
        setOpenAddEvent(false)
        setNewTitle("")
        setNewStartDate("")
        setNewEndingDate("")
        setNewNotes("")
        setEventType("")
        grabEvents()
    }
 
    // const handleDateClick = (arg) => {
    //     console.log(arg.dateStr, "- render DATE modal")
    //     console.log(arg)
    //     // let eventDate
    //     // if (arg.allDay === true) {
    //     //     eventDate = arg.dateStr + "00"
    //     // }
    //     setNewStartDate(arg.dateStr)
    // }

    const handleSelection = (arg) => {
        console.log(arg)
        console.log(arg.start)
        setNewStartDate(arg.startStr)
        setNewEndingDate(arg.endStr)
        setNewTitle("")
        setNewNotes("")
        setEventType("")
        toggleUpdatingEvent(false)

        // setOpenAddEvent(true)
    }

    const handleEventClick = (arg) => {
        console.log(arg.event)
        console.log(arg.event._def.title)
        console.log(arg.event._def.publicId) // grabs event Id
        let eventId = parseInt(arg.event._def.publicId, 10)
        setUpdateId(eventId)
        let updateEventObj
        // make these alerts into snackboxes 
        if (arg.event._def.publicId === "holiday") {alert("Sorry! You can't update holidays")} else {
        props.user_events.map(event => {if (event.id === eventId) {updateEventObj = event}})
        console.log(updateEventObj)
        
        setNewTitle(updateEventObj.title)
        setNewStartDate(updateEventObj.start_date)
        if (updateEventObj.end_date) {setNewEndingDate(updateEventObj.end_date)} else {setNewEndingDate("")}
        if (updateEventObj.notes) {setNewNotes(updateEventObj.notes)} else {setNewNotes("")}
        setEventType(updateEventObj.event_type)
        toggleUpdatingEvent(true)
        // setOpenUpdateEvent(true)
        }
    
    }

    const updateEvent = (e) => {
        e.preventDefault()
        console.log("hello i'm going to update!")
        let info = {
            title: updateTitle,
            start_date: updateStartDate,
            end_date: updateEndingDate,
            notes: updateNotes,
            user_id: userId,
            event_type: updateEventType
        }
        console.log(info)
        props.updateEvent(e, info, updateId)
        // grabEvents()

        setNewTitle("")
        setNewStartDate("")
        setNewEndingDate("")
        setNewNotes("")
        setEventType("")
        toggleUpdatingEvent(false)
        setOpenUpdateEvent(false)
    }

    // const toggleCloseModal = () => {
    //     setOpenAddEvent(false)
    //     toggleUpdatingEvent(false)
    //     setNewTitle("")
    //     setNewStartDate("")
    //     setNewEndingDate("")
    //     setNewNotes("")
    //     setEventType("")
    // }

    const handleEventStartChange = (info) => {
        console.log(info)
    }


    if (localStorage.loggedIn) {
    return (
        <div>
            {/* Modal to ADD event */}
            <Modal
                basic
                // onSubmit={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}
                onClose={() => setOpenAddEvent(false)}
                // onClose={() => setOpenAddEvent(false)}
                onOpen={() => setOpenAddEvent(true)}
                open={openAddEvent}
                size='small'
                trigger={<Button className="addButton">{updatingEvent ? "Update Event" : "Add Event"}</Button>}
                >
                <Header icon>
                    <Icon name='calendar' />
                    {updatingEvent ? "Update This Event" : "Add a New Event"}
                </Header>
                <Modal.Content>
                    <div>
                        {/* <form className="ui form" onSubmit={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}> */}
                        <form className="ui form" >

                            <div className="field">
                                <p>Title</p>
                                <input name="title" placeholder="e.g., Someone's Birthday" value={newTitle}
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
                                <input name="start" placeholder="e.g., 2020/08/30" value={newStartDate}
                                onChange={(e) => setNewStartDate(e.target.value)}></input>
                            </div>
                            <br />

                            <div className="field">
                                <p>End Date, if applicable (YYYY/MM/DD)</p>
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
                    <Button basic color='red' inverted onClick={() => setOpenAddEvent(false)}>
                    <Icon name='remove' /> Cancel/Close
                    </Button>
                    <Button color='green' inverted type="submit" value="submit"
                    onClick={(e) => {updatingEvent ? updateEvent(e) : createNewEvent(e)}}>
                            <Icon name='checkmark' /> {updatingEvent ? "Update Event!" : "Add Event!"}
                    </Button>
                </Modal.Actions>
                    
            </Modal>

            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                // themeSystem='bootstrap'
                selectable={true}
                timeZone="UTC"
                forceEventDuration={true}
                // dateClick={handleDateClick}
                eventClick={handleEventClick}
                select={handleSelection}
                // customButtons={{
                //     addEventButton: {
                //         text: 'Add Event',
                //         click: () => setOpenAddEvent(true)
                //     }
                // }}
                headerToolbar={{
                    right: 'prev,next',
                    center: 'title',
                    left: 'today,dayGridMonth,timeGridWeek'
                }}
                // navLinks={true} // new code? 
                events={renderCalendarEvents}
                eventColor='#808080'
                dayMaxEventRows={true}
                dayMaxEvents={true}
                // editable={true}
                // eventDragStart={handleEventStartChange()}
                moreLinkClick="popover"
                // dayCellClassNames={(arg) => console.log(arg)}

            />

            {/* Modal for Adding an Event - form */}
            
        </div>
    ) }  else {
        alert("Sorry, you must be logged in to see your monthly calendar!")
        return ( <Redirect to="/" /> )
    }
}

const mapStateToProps = state => {
    return {
        holidays: state.userReducer.holidays,
        user_events: state.userReducer['user_events'],
        rerender: state.userReducer.rerender,
        daily_posts: state.userReducer['daily_posts']
    }
}


export default connect(mapStateToProps)(Month)
