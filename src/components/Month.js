import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import { connect } from 'react-redux'

const Month = (props) => {
 
    const handleDateClick = (arg) => {
        console.log(arg.dateStr, "- render DATE modal")
        console.log(props.userEvents)
    }

    const addEvent = (e) => {
        console.log('clicked add event button. render add event modal here')
    }

    const renderEvents = (e) => {
        if (props.userEvents) { return props.userEvents.map(event => 
            {return {title: event.event.title, date: event.event['start_date']}} )
        } else { return null }
    }

    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        customButtons={{
            addEventButton: {
                text: 'Add Event',
                click: addEvent
            }
        }}
        headerToolbar={{
            center: 'addEventButton'
        }}
        events={renderEvents()}

      />
    )
}

const mapStateToProps = state => {
    return {
        userEvents: state.userReducer['user_events']
    }
}

export default connect(mapStateToProps)(Month)


// import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from "@fullcalendar/interaction"; 
// import { connect } from 'react-redux'
// import AddEventModal from './AddEventModal'
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// const AddEventModal = () => {
  

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Open Modal
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         {body}
//       </Modal>
//     </div>
//   );
// }


// const handleDateClick = (info) => {
//     console.log(info.dateStr, "- render DATE modal")
//     console.log(this.props.userEvents)
// }

// const addEvent = (e) => {
//     console.log('clicked add event button. render add event modal here')
    
// }

// const renderEvents = (e) => {
//     if (this.props.userEvents) { return this.props.userEvents.map(event => 
//         {return {title: event.event.title, date: event.event['start_date']}} )
//     } else { return null }
// }

// const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);

// const handleOpen = () => {
//     setOpen(true);  
// };

// const handleClose = () => {
//     setOpen(false);
// };

// const body = (
//     <div style={modalStyle} className={classes.paper}>
//         <h2 id="simple-modal-title">Text in a modal</h2>
//         <p id="simple-modal-description">
//         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//         </p>
//         <AddEventModal />
//     </div>
// );

// const Month = (userEvents) => {

//     const classes = useStyles();
//     getModalStyle is not a pure function, we roll the style only on the first render
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => {
//         setOpen(true);  
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const body = (
//         <div style={modalStyle} className={classes.paper}>
//             <h2 id="simple-modal-title">Text in a modal</h2>
//             <p id="simple-modal-description">
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </p>
//             <Modal />
//         </div>
//     );

//     const handleDateClick = (info) => {
//         console.log(info.dateStr, "- render DATE modal")
//         console.log(this.props.userEvents)
//     }

//     const renderEvents = (e) => {
//         console.log("help")
//         if (this.props.userEvents) { return this.props.userEvents.map(event => 
//             {return {title: event.event.title, date: event.event['start_date']}} )
//         } else { return null }
//     }
    
  
//     return (
//     <div>
//         <FullCalendar
//         plugins={[ dayGridPlugin, interactionPlugin ]}
//         initialView="dayGridMonth"
//         dateClick={handleDateClick}
//         customButtons={{
//             addEventButton: {
//                 text: 'Add Event',
//                 click: function() {
//                     handleOpen()
//                 }
                
//             }
//         }}
//         headerToolbar={{
//             center: 'addEventButton'
//         }}
//         events={renderEvents()}

//         />

        
//         {/* <button type="button" onClick={handleOpen}>
//             Open Modal
//         </button> */}
//         <Modal
//             open={open}
//             onClose={handleClose()}
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//         >
//             {body}
//         </Modal>
        
//     </div>
//     )
// }
  

// const mapStateToProps = state => {
//     if (state.userReducer.userData) {
//         return {
//             userEvents: state.userReducer.userData['user_events']
//         }
//     }
// }

// export default connect(mapStateToProps)(Month)
