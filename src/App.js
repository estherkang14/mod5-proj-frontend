import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css' 
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import TopNavBar from './containers/TopNavBar'
import TopNavBar2 from './containers/TopNavBar2'
import SideNavBar from './containers/SideNavBar'
import Today from './components/Today'
import DisplayPage from './containers/DisplayPage'
import { connect } from 'react-redux'
import { storeUser, logOut, getWeather } from './actions/auth'
import { useHistory } from 'react-router-dom'

let BASEURL = "http://localhost:3000/"
let LOGINURL = BASEURL + "login"
let USERSURL = BASEURL + "users/"

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
      localStorage.setItem("user", data.user)
      localStorage.setItem("userId",data.user.id)
      this.setState({loggedIn: true}) 
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
      localStorage.setItem("user", data.user)
      this.setState({ loggedIn: true, userId: data.user.id })
      this.fetchUserApi(data.user.id)
    })
    .catch(error => alert(error))
  }

  logOut = (e) => {
    e.preventDefault()
    this.setState({loggedIn: false}, localStorage.clear(), alert("You have been logged out"),
    this.props.logOut())
  }

  renderTopNavBar = () => {
    if (this.state.loggedIn) {
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
      localStorage.setItem("userEventData", userData)
      console.log("User Data Fetched")
    })
  }

  fetchWeather = () => {
    
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

            <Route path="/home" render={(routeProps) => <DisplayPage {...routeProps} />} />
            
            <Route path="/" render={(routeProps) => (this.state.loggedIn) ? <Redirect to="/home" /> : <LandingPage 
            logIn={this.logIn} signUp={this.signUp} {...routeProps}/>} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}



export default connect(null, { storeUser, logOut })(App);
