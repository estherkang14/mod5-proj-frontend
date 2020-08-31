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
import Week from './components/Week'
import DisplayPage from './containers/DisplayPage'
import { connect } from 'react-redux'
import { storeUser, logOut, getWeather, storeMoods, storeHolidays, postDailyPost, storeTasks, postEvent } from './actions/auth'
import { useHistory } from 'react-router-dom'

let BASEURL = "http://localhost:3000/"
let LOGINURL = BASEURL + "login"
let USERSURL = BASEURL + "users/"
let MOODSURL = BASEURL + "moods"
let DAILYPOSTURL = BASEURL + 'daily_posts'
let EVENTSURL = BASEURL + 'events'
let HOLIDAYSURL = BASEURL + 'holidays'

class App extends React.Component {
  state = {
    loggedIn: false,
    // username: '',
    // password: '', 
    // location: '',
    // name: '',
    userId: ''
    
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
      localStorage.setItem("token", data.token)
      localStorage.setItem("loggedIn", "true")
      localStorage.setItem("userId",data.user.id)
      this.setState({loggedIn: true, userId: data.user.id}) 
      this.fetchUserApi(data.user.id)
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
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.user.id)
      localStorage.setItem("loggedIn", "true")
      this.setState({ loggedIn: true, userId: data.user.id })
      this.fetchUserApi(data.user.id)
    })
    .catch(error => alert(error))
  }

  logOut = (e) => {
    e.preventDefault()
    this.setState({loggedIn: false}, localStorage.clear(),
    this.props.logOut())
  }

  renderTopNavBar = () => {
    if (localStorage.getItem('loggedIn')) {
      return (
        <TopNavBar2 logOut={this.logOut}/>
      )
    } else {
      return ( 
        <TopNavBar />
      )
    }
  }

  renderSideNavBar = () => {
    if (this.state.loggedIn) {
      return (
        <SideNavBar />
      )
    }
  }

  fetchUserApi = (userId) => {
    fetch(USERSURL + userId)
    .then(response => response.json())
    .then(userData => {
      this.props.storeUser(userData)
      
      localStorage.setItem('userData', JSON.stringify(userData))
      
      let nontasks = userData['events'].filter(event => event['event_type'] !== "Task")
      let tasks = userData['events'].filter(event=> event['event_type'] === "Task")
      // this.props.storeTasks(tasks)

      localStorage.setItem('userEvents', JSON.stringify(nontasks))
      localStorage.setItem('daily_posts', JSON.stringify(userData['daily_posts']))
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log("User Data Fetched")
    })
  }

  fetchWeather = () => {
    
  }

  componentDidMount = () => {
    this.fetchMoods()
    this.fetchHolidays()

    if (localStorage.userId) {
      this.fetchUserApi(localStorage.userId)
      
    }
  }

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
      console.log(daily_post)
      this.props.postDailyPost(daily_post)
    })

  }

  addEventForUser = (e, eventInfo) => {
    e.preventDefault()
    const form = new FormData()
    form.append('user_id', eventInfo['user_id'])
    form.append('title', eventInfo.title)
    form.append('start_date', eventInfo['start_date'])
    form.append('end_date', eventInfo['end_date'])
    form.append('notes', eventInfo.notes)

    console.log(form)

    let options = {
      method: 'POST',
      body: form
    }

    fetch(EVENTSURL, options)
    .then(response => response.json())
    .then(event => {
      console.log(event)
      this.props.postEvent(event)
    })
  }

  

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        {this.renderTopNavBar()}
        {/* {this.renderSideNavBar()} */}
        <SideNavBar />
        <div className="container">
          <Switch>
            Routes and components go here! 
            <Route path="/month" render={(routeProps) => <Month addEventForUser={this.addEventForUser} {...routeProps}/>} />
            
            <Route path="/week" render={(routeProps) => <Week {...routeProps } /> }/>

            <Route path="/home" render={(routeProps) => <DisplayPage {...routeProps} postDailyPost={this.addDailyPost} />} />
            
            <Route path="/" render={(routeProps) => (this.state.loggedIn) ? <Redirect to="/home" /> : <LandingPage 
            logIn={this.logIn} signUp={this.signUp} {...routeProps}/>} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}



export default connect(null, { storeUser, logOut, storeMoods, storeHolidays, postDailyPost, storeTasks, postEvent })(App);
