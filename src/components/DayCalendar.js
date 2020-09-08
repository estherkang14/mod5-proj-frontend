import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { connect } from 'react-redux'


const DayCalendar = (props) => {


  const [renderCalendarEvents, setCalendarEvents] = React.useState([])

  React.useEffect( () => {
    if (props.daily_posts) {
      props.daily_posts.map(post => setCalendarEvents(prevState => [...prevState, {title: 'DAILY POST', 
      date: post.date, id: "daily post", extendedProps: {mood: post.mood}, color: post.mood.hexcode, display: 'background'}]))
  }
  if (props.holidays) {
      props.holidays.map(event => setCalendarEvents(prevState => [...prevState, {title: event.title, 
      date: event['start_date'], id: "holiday", borderColor: "#000000"}]))
  }
  if (props.user_events) {
      props.user_events.map(event => setCalendarEvents(original => [...original, {title: event.title, 
      start: event['start_date'], end: event['end_date'], id: event.id, extendedProps: event.notes
      }]))

  }
  }, [props.daily_posts])

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridDay"
        headerToolbar={{
          right: "",
          center: 'title',
          left: 'today prev,next'
      }}
        events={renderCalendarEvents}
        eventColor='#bdbdbd'
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    holidays: state.holidays,
    user_events: state['user_events'],
    daily_posts: state['daily_posts']
  }
}

export default connect(mapStateToProps)(DayCalendar)