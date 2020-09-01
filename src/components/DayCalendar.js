import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { connect } from 'react-redux'


const DayCalendar = (props) => {


  const [renderCalendarEvents, setCalendarEvents] = React.useState([])

  React.useEffect( () => {
    if (props.holidays) {
      props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, date: event['start_date']}]))
    }
    if (props.user_events) {
      props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, date: event['start_date']}]))
    }

    if (props.daily_posts) {
      props.daily_posts.map(post => setCalendarEvents(original => [...original, {title: "Daily Post", date: post.date}]))
    }
  }, [])

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridDay"
        // customButtons={{
        //     addEventButton: {
        //         text: 'Add Event',
        //         click: () => setOpenAddEvent(true)
        //     }
        // }}
        // headerToolbar={{
        //     center: 'addEventButton'
        // }}
        events={renderCalendarEvents}

      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    holidays: state.userReducer.holidays,
    user_events: state.userReducer['user_events'],
    daily_posts: state.userReducer['daily_posts']
  }
}

export default connect(mapStateToProps)(DayCalendar)