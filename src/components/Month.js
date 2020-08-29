import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import { connect } from 'react-redux'

class Month extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
        customButtons={{
            addEventButton: {
                text: 'Add Event',
                click: this.addEvent
            }
        }}
        headerToolbar={{
            center: 'addEventButton'
        }}
        events={this.renderEvents()}

      />
    )
  }

  handleDateClick = (arg) => {
    console.log(arg.dateStr, "- render DATE modal")
    console.log(this.props.userEvents)
  }

  addEvent = (e) => {
    console.log('clicked add event button. render add event modal here')
  }

  renderEvents = (e) => {
      if (this.props.userEvents) { return this.props.userEvents.map(event => 
        {return {title: event.event.title, date: event.event['start_date']}} )
    } else { return null }
  }
}

const mapStateToProps = state => {
    return {
        userEvents: state.userReducer.userData['user_events']
    }
}

export default connect(mapStateToProps)(Month)