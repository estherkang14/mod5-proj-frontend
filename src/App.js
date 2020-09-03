import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css' 
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import TopNavBar from './containers/TopNavBar'
import TopNavBar2 from './containers/TopNavBar2'
import SideNavBar from './containers/SideNavBar'
import Today from './components/Today'
import Month from './components/Month'
import DisplayPage from './containers/DisplayPage'
import { connect } from 'react-redux'
import { logIn, storeUser, logOut,  storeMoods, storeHolidays, storeDailyPosts, storeTasks, storeEvents } from './actions/auth'
import { toggleDailyPostButton, getWeather, reRender, postEvent, postTask, deleteTask, postDailyPost } from './actions/calendar'
import { useHistory } from 'react-router-dom'
// import { createBrowserHistory } from 'history'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { render } from 'react-dom';

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
       loggedIn: false

   } 
  // snackbar for login
//   const [openSnack, setOpenSnack] = React.useState(false);
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpenSnack(false);
    this.setState({
        openSnack: false
    })
  };

//   const [loginSignupError, setLoginSignupError] = React.useState("")

//   const [loggedIn, setLoggedIn] = React.useState(false)

// let history = createBrowserHistory()
fetchUserApi = (userId) => {
    fetch(USERSURL + userId)
    .then(response => response.json())
    .then(userData => {
    
      localStorage.setItem('userData', JSON.stringify(userData))
      this.props.storeUser(userData)
      let nontasks = userData['events'].filter(event => event['event_type'] !== "Task")
      let tasks = userData['events'].filter(event=> event['event_type'] === "Task")
      let posts = userData['daily_posts']
      
      localStorage.setItem('userEvents', JSON.stringify(nontasks))
      localStorage.setItem('daily_posts', JSON.stringify(userData['daily_posts']))
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.props.storeTasks(tasks)
      this.props.storeDailyPosts(posts)
      this.props.storeEvents(nontasks)
      console.log("User Data Fetched")
    })
  }  
componentDidMount = () => {
    this.fetchMoods()
    this.fetchHolidays()

    if (localStorage.userId) {
      this.fetchUserApi(localStorage.userId)
    }
  }
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
        this.props.logIn(data.user)
        this.fetchUserApi(data.user.id)
        this.setState({ loggedIn: true })
        //refreshPage()
        //history.push("/home")
      } else {
          this.setState({ loginSignupError: data.error })
          this.setState({ openSnack: true})
        // setLoginSignupError(data.error)
        // setOpenSnack(true)
      }
    })
  }

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
        localStorage.setItem("token", data.token)
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("userId",data.user.id)
        
        // refreshPage()
      } else {
        this.setState({ loginSignupError: data.error })
        this.setState({ openSnack: true})
        // setLoginSignupError(data.error)
        // setOpenSnack(true)
      }
    })
  }

  logOut = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.props.logOut()
    this.setState({ loggedIn: false })
    // refreshPage()
    // history.push("/")
  }

  refreshPage = () => {
      window.location.reload(false)
  }

  renderTopNavBar = () => {
    if (localStorage.getItem('loggedIn')) {
      return (
        <TopNavBar2 logOut={logOut}/>
      )
    } else {
      return ( 
        <TopNavBar />
      )
    }
  }

 


  

  fetchWeather = () => {
    
  }

//   React.useEffect( () => {
//     fetchMoods()
//     fetchHolidays()

//     if (localStorage.userId) {
//       fetchUserApi(localStorage.userId)
      
//     }
//   }, [])

  fetchMoods = () => {
    fetch(MOODSURL)
    .then(response => response.json())
    .then(moods => {
      this.props.storeMoods(moods)
      localStorage.setItem('moods', JSON.stringify(moods))
      console.log("Moods fetched")
    })
  }

  fetchHolidays = () => {
    fetch(HOLIDAYSURL)
    .then(response => response.json())
    .then(holidays =>{
      this.props.storeHolidays(holidays)
      localStorage.setItem('holidays', JSON.stringify(holidays))
      console.log("Holidays fetched")
    })
  }

  addDailyPost = (e, postInfo) => {
    e.preventDefault()
    const form = new FormData()
    form.append('user_id', postInfo['user_id'])
    form.append('mood_id', postInfo['mood_id'])
    form.append('date', postInfo.date)
    form.append('struggle', postInfo.struggle)
    form.append('thankful', postInfo.thankful)
    form.append('summary', postInfo.summary)
    
    let options = {
      method: 'POST',
      body: form
    }

    fetch(DAILYPOSTURL, options)
    .then(response => response.json())
    .then(daily_post => {
      if (!daily_post.errors) {
        this.props.postDailyPost(daily_post)
        console.log(daily_post) 
        this.props.toggleDailyPostButton()
        localStorage.setItem("dailyPost", true)
        this.fetchUserApi(localStorage.userId)
      } else {
        this.setState({ loginSignupError: daily_post.error })
        this.setState({ openSnack: true})
        // setLoginSignupError(daily_post.errors)
        // setOpenSnack(true)
      }
    })
    .then(console.log("blah"))
    .catch((errors) => console.log(errors))
  }

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
      method: 'PUT',
      body: form
    }

    fetch(DAILYPOSTURL + postId, options)
    .then(response => response.json())
    .then(daily_post => {
      console.log(daily_post)
      this.props.postDailyPost(daily_post)  // change to update and add to auth + userReducer
      this.fetchUserApi(localStorage.userId)
    })
  }

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
      console.log(event)

      if (!event.errors) {
        if (event.event_type === "Task") {
          this.props.postTask(event)
          this.fetchUserApi(localStorage.userId)
          
        } else {
         this.props.postEvent(event)
         this.fetchUserApi(localStorage.userId)
         console.log("hello")
        }
      } else {
        this.setState({ loginSignupError: event.errors })
        this.setState({ openSnack: true})
        //   setLoginSignupError(event.errors)
        //   setOpenSnack(true)
      }
      // localStorage.userEvents = props.userEvents
    })
    // .then( )
  }

  destroyTask = (e, task) => {
    e.preventDefault()

    let options = {
      method: "DELETE"
    }

    fetch(EVENTSURL + `${task.id}`, {method: 'DELETE'})
    .then(response => response.json())
    .then(deletedTask => { console.log(deletedTask) 
        this.props.deleteTask(deletedTask)
        alert(`Task: ${deletedTask.title} has been deleted!`)
    })

  }

  
  
  render() {
        return(
            <div>
            <BrowserRouter>
            <div className="App">
            {this.renderTopNavBar()}
            {/* {this.renderSideNavBar()} */}
            <SideNavBar />
            <div className="container">
                <Switch>
                {/* Routes and components go here!  */}
                <Route path="/month" render={(routeProps) => <Month addEventForUser={this.addEventForUser} {...routeProps}/>} />

                <Route path="/home" render={(routeProps) => <DisplayPage {...routeProps} postDailyPost={this.addDailyPost}
                addEventForUser={this.addEventForUser} destroyTask={this.destroyTask} />} />
                
                <Route path="/" render={(routeProps) => (this.props.loggedIn) ? <Redirect to="/home" /> : <LandingPage 
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
    loggedIn: state.userReducer.loggedIn,
    user_events: state.userReducer['user_events']
  }
}

const actionCreators = {
  storeUser, 
  logIn, 
  logOut, 
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
  reRender
}



export default connect(mapStateToProps, actionCreators)(App);
