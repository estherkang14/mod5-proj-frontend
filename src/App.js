// NEED TO REFACTOR ALL THE CODE HERE!! TOO MESSY AND HARD TO READ/DISORGANIZED

import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css' 
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import SideNavBar from './containers/SideNavBar'
import Month from './components/Month'
import DisplayPage from './containers/DisplayPage'
import { connect } from 'react-redux'
import { logIn, storeUser, logOut, signUp, storeMoods, storeHolidays, storeDailyPosts, storeTasks, storeEvents, storeWeather,
deleteUser, updateUser } from './actions/auth'
import { toggleDailyPostButton, postEvent, postTask, deleteTask, postDailyPost, 
  updateDailyPost, updateEvent, deleteEvent } from './actions/calendar'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

let BASEURL = "http://localhost:3000/"
let LOGINURL = BASEURL + "login"
let USERSURL = BASEURL + "users/"
let MOODSURL = BASEURL + "moods"
let DAILYPOSTURL = BASEURL + 'daily_posts/'
let EVENTSURL = BASEURL + 'events/'
let HOLIDAYSURL = BASEURL + 'holidays'

class App extends React.Component {


  state = {
      openSnack: false,
      loginSignupError: "",
      loggedIn: false,
      user_events_array: []

  } 
  // snackbar for login
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
        openSnack: false
    })
  };

// fetch user's account info + data
fetchUserApi = (userId) => {
    fetch(USERSURL + userId)
    .then(response => response.json())
    .then(userData => {
    
      localStorage.setItem('userData', JSON.stringify(userData))
      
      let nontasks = userData['events'].filter(event => event['event_type'] !== "Task")
      let tasks = userData['events'].filter(event=> event['event_type'] === "Task")
      let posts = userData['daily_posts']
      
      localStorage.setItem('userEvents', JSON.stringify(nontasks))
      localStorage.setItem('daily_posts', JSON.stringify(userData['daily_posts']))
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.props.storeUser(userData)
      this.props.storeTasks(tasks)
      this.props.storeDailyPosts(posts)
      this.props.storeEvents(nontasks)
      console.log("User Data Fetched")
    })
  }  

// login - goes thru backend for authentication and then sets local storage items necessary for other fxns
// then calls fetchUserApi (above), fetch moods and holidays
  logIn = (e, user) => {
    e.preventDefault()
    let options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(user)
    }

    fetch(LOGINURL, options)
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("userId",data.user.id)
        localStorage.setItem("name", data.user.name)
        this.props.logIn(data.user)
        this.fetchUserApi(data.user.id)
        this.setState({ loggedIn: true })
        this.fetchMoods()
        this.fetchHolidays()
        
      } else {
          this.setState({ loginSignupError: data.error })
          this.setState({ openSnack: true})
      }
    })
  }

  // signing up for new account - goes thru backend for authentication process bc pw
  // then does everything the same as logging in
  signUp = (e, user) => {
    e.preventDefault()

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }, 
      body: JSON.stringify({user})
    }

    fetch(USERSURL, options)
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        this.fetchUserApi(data.user.id) 
        this.props.signUp(data.user)
        localStorage.setItem("token", data.token)
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("userId",data.user.id)
        localStorage.setItem("name", data.user.name)
      } else {
        this.setState({ loginSignupError: data.error })
        this.setState({ openSnack: true})
      }
    })
  }

  // log out fxn, clears local storage of user info/data
  logOut = (e) => {
    this.clearLocalStorage()
    this.props.logOut()
    this.setState({ 
      loggedIn: false,
      loginSignupError: "You have been logged out!",
      openSnack: true 
     })

  }

  // clears local storage for everything but holidays + moods bc those are consistent for all users
  clearLocalStorage = () => {
    localStorage.removeItem('daily_posts')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('tasks')
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('userEvents')
    localStorage.removeItem('userId')
    localStorage.removeItem('weather')
  }

  componentDidMount = () => {
    
    if (localStorage.userId) {
      this.fetchUserApi(localStorage.userId)
      this.fetchWeather()
    }
    
    this.fetchMoods()
    this.fetchHolidays()

  }

// this fetches weather based off user's location set from creating an account
  fetchWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.userData.zipcode},us&appid=444f4eae28a53130e131718e48f3fd80&units=imperial`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("weather", JSON.stringify(data))
      this.props.storeWeather(data)
      console.log("Weather fetched")
    })
  }

// this fetches moods + their colors for daily posts (when signed in)
  fetchMoods = () => {
    fetch(MOODSURL)
    .then(response => response.json())
    .then(moods => {
      this.props.storeMoods(moods)
      localStorage.setItem('moods', JSON.stringify(moods))
      console.log("Moods fetched")
    })
  }

// this fetches holidays (via seeds in backend) that will be consistent for ALL users - displayed on calendar
  fetchHolidays = () => {
    fetch(HOLIDAYSURL)
    .then(response => response.json())
    .then(holidays =>{
      this.props.storeHolidays(holidays)
      localStorage.setItem('holidays', JSON.stringify(holidays))
      console.log("Holidays fetched")
    })
  }

// posts to backend daily post model using user id from local storage
  addDailyPost = (e, postInfo) => {
    e.preventDefault()
    const form = new FormData()
    form.append('user_id', postInfo['user_id'])
    form.append('mood_id', postInfo['mood_id'])
    form.append('date', postInfo.date)
    form.append('struggle', postInfo.struggle)
    form.append('thankful', postInfo.thankful)
    form.append('summary', postInfo.summary)
    form.append('water', 0)
    
    let options = {
      method: 'POST',
      body: form
    }

    fetch(DAILYPOSTURL, options)
    .then(response => response.json())
    .then(daily_post => {
      if (!daily_post.errors) {
        this.props.postDailyPost(daily_post)
        this.setState({ loginSignupError: `Daily Post for ${daily_post.date} has been created` })
        this.setState({ openSnack: true})
      } else {
        this.setState({ loginSignupError: daily_post.error })
        this.setState({ openSnack: true})
      }
    })
    .catch((errors) => console.log(errors))
  }

// updates daily post - only updatable for THAT day. cannot update other days
  updateDailyPost = (e, postInfo, postId) => {
    e.preventDefault()

    const form = new FormData()
    form.append('user_id', postInfo['user_id'])
    form.append('mood_id', postInfo['mood_id'])
    form.append('date', postInfo.date)
    form.append('struggle', postInfo.struggle)
    form.append('thankful', postInfo.thankful)
    form.append('summary', postInfo.summary)

    let options = {
      method: 'PATCH',
      body: form
    }

    fetch(DAILYPOSTURL + postId, options)
    .then(response => response.json())
    .then(daily_post => {
      this.props.updateDailyPost(daily_post)  
      this.setState({ loginSignupError: `Daily Post for ${daily_post.date} has been updated` })
      this.setState({ openSnack: true})
    })
  }

// updates daily post's water cup number 
  updatePostWater = (e, postInfo, postId) => {
    e.preventDefault()
    const form = new FormData()
    form.append('water', postInfo.water)

    let options = {
      method: 'PATCH',
      body: form
    }

    fetch(DAILYPOSTURL + postId, options)
    .then(response => response.json())
    .then(daily_post => {
      this.props.updateDailyPost(daily_post)
    })
  }

// adds event to backend for specific user (from local storage - user id)
// this is for EITHER event OR task
  addEventForUser = (e, eventInfo) => {
    e.preventDefault()
    const form = new FormData()
    form.append('user_id', eventInfo['user_id'])
    form.append('title', eventInfo.title)
    if (eventInfo.notes) {form.append('notes', eventInfo.notes)}
    form.append('event_type', eventInfo['event_type'])
    if (eventInfo['start_date']) {form.append('start_date', eventInfo['start_date'])}
    if (eventInfo['end_date']) {form.append('end_date', eventInfo['end_date'])}

    let options = {
      method: 'POST',
      body: form
    }

    fetch(EVENTSURL, options)
    .then(response => response.json())
    .then(event => {
      if (!event.errors) {
        if (event.event_type === "Task") {
          this.props.postTask(event)
          this.setState({ loginSignupError: `Task '${event.title}' has been has been added to your Task List` })
          this.setState({ openSnack: true})
        } else {
          this.props.postEvent(event)
          this.setState({ loginSignupError: `Event '${event.title}' has been added to your Calendar` })
          this.setState({ openSnack: true})
        }
      } else {
        this.setState({ loginSignupError: event.errors })
        this.setState({ openSnack: true})
      }
    })
    .catch((errors) => console.log(errors))
  
  }

// this is to update events
  updateEvent = (e, eventInfo, updateid) => {
    e.preventDefault()
    const form = new FormData()
    form.append('user_id', eventInfo['user_id'])
    form.append('title', eventInfo.title)
    if (eventInfo.notes) {form.append('notes', eventInfo.notes)}
    form.append('event_type', eventInfo['event_type'])
    form.append('start_date', eventInfo['start_date'])
    if (eventInfo['end_date']) {form.append('end_date', eventInfo['end_date'])}

    let options = {
      method: 'PUT',
      body: form
    }

    fetch(EVENTSURL + updateid, options)
    .then(response => response.json())
    .then(data => {
      if (!data.errors) {
        this.props.updateEvent(data)
        this.setState({ loginSignupError: `Event '${data.title}' has been updated` })
        this.setState({ openSnack: true})
      } else {
        this.setState({ loginSignupError: data.errors })
        this.setState({ openSnack: true})
      }
    })
    .catch((errors) => console.log(errors))

  }

// deletes event from backend - permanent removal for user
// cannot destroy holidays 
  destroyEvent = (e, userEvent) => {
    e.preventDefault()

    fetch(EVENTSURL + `${userEvent}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(deletedEvent => { 
      this.props.deleteEvent(deletedEvent)
      this.setState({ loginSignupError: `Event '${deletedEvent.title}' has been deleted` })
      this.setState({ openSnack: true})
    })
  }

// deletes task from backend - "completed task"
// also permanent removal
  destroyTask = (e, task) => {
    e.preventDefault()

    fetch(EVENTSURL + `${task.id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(deletedTask => {  
        this.props.deleteTask(deletedTask)
        this.setState({ loginSignupError: `Task '${deletedTask.title}' has been deleted` })
        this.setState({ openSnack: true})
    })

  }

// to update user's profile - mainly to change zipcode so weather data/info can change
// can update username too - need to figure out how verification plays a role in this
// make sure you check to see if the error snack bar pops up if you try to update to an existing username
  updateProfile = (e, userInfo) => {
    e.preventDefault()
    // console.log(userInfo)

    const form = new FormData()
    // form.append()
    // figure out how to update one OR multiple sections on profile at once ? 
    // send ALL data at once even if things aren't being changed? 
    form.append('name', userInfo.accountName)
    form.append('username', userInfo.username)
    form.append('zipcode', userInfo.zipcode)
    form.append('location', userInfo.location)

    console.log(form)

    let options = {
      method: 'PUT',
      body: { form }
    }


    // fetch(USERSURL + localStorage.userId, options)
    // .then(response => response.json())
    // .then(updatedUser => {
    //   if (!updatedUser.errors) {
    //     localStorage.userData = updatedUser 
    //     this.props.updateUser(updatedUser)
    //     this.setState({ loginSignupError: `User '${updatedUser.username}' has been updated` })
    //     this.setState({ openSnack: true})
    //   } else {
    //     this.setState({ loginSignupError: updatedUser.errors })
    //     this.setState({ openSnack: true})
    //   }
    // })
    // .catch((errors) => console.log(errors))

    // fetch(USERSURL + user.id, options)
    // .then(response => response.json())
    // .then(updatedUser => {
    //   localStorage.userData = updatedUser 
    //   this.props.updateUser(updatedUser)
    // })
  }

// permanently deletes a user's account and logs you out
  deleteAccount = (e) => {
    e.preventDefault()
      fetch(USERSURL + localStorage.userId, {method: 'DELETE'})
      .then(response => response.json())
      .then(deletedUser => {  
          this.props.deleteUser(deletedUser)
          this.clearLocalStorage()
          this.setState({ 
            loggedIn: false,
            loginSignupError: `Account '${deletedUser.username}' has been deleted!`,
            openSnack: true 
          })
      })
  }

  
  
  render() {
        return(
            <div>
            <BrowserRouter>
            <div className="App">
            <SideNavBar logOut={this.logOut} deleteAccount={this.deleteAccount} updateProfile={this.updateProfile}/>
            <div className="container">
                <Switch>
                {/* Routes and components go here!  */}
                <Route path="/calendar" render={(routeProps) => <Month addEventForUser={this.addEventForUser} 
                updateEvent={this.updateEvent} destroyEvent={this.destroyEvent} {...routeProps}/>} />

                <Route path="/home" render={(routeProps) => (localStorage.loggedIn) ? <DisplayPage {...routeProps} postDailyPost={this.addDailyPost}
                updateDailyPost={this.updateDailyPost} addEventForUser={this.addEventForUser} 
                destroyTask={this.destroyTask} updatePostWater={this.updatePostWater}/> : <Redirect to="/" />} />
                
                <Route path="/" render={(routeProps) => (localStorage.loggedIn) ? <Redirect to="/home" /> : <LandingPage 
                logIn={this.logIn} signUp={this.signUp} 
                 {...routeProps}/>} />
                </Switch>
                    <div> {/*div for snackbar */}
                        <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.openSnack}
                        autoHideDuration={6000}
                        message={this.state.loginSignupError}
                        onClose={this.handleClose}
                        action={
                            <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.handleClose()}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            </React.Fragment>
                        }
                        />
                    </div>
            </div>

            

            </div>
            </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}

const actionCreators = {
  storeUser, 
  logIn, 
  logOut, 
  signUp,
  storeMoods, 
  storeHolidays, 
  storeDailyPosts, 
  postDailyPost,
  storeTasks, 
  postEvent, 
  postTask, 
  deleteTask, 
  toggleDailyPostButton, 
  storeEvents, 
  updateEvent,
  updateDailyPost,
  deleteEvent,
  storeWeather,
  deleteUser,
  updateUser
}



export default connect(mapStateToProps, actionCreators)(App);
