import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css' 
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import TopNavBar from './containers/TopNavBar'
import TopNavBar2 from './containers/TopNavBar2'
import SideNavBar from './containers/SideNavBar'
import Today from './components/Today'
import { connect } from 'react-redux'

let BASEURL = "http://localhost:3000/"
let LOGINURL = BASEURL + "login"

class App extends React.Component {
  state = {
    loggedIn: false,
    username: '',
    password: '', 
    
  }

  setUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  setPassword = (e) => {
    this.setState({
      password: e.target.value
    })
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
    })
  }

  logOut = (e) => {
    e.preventDefault()
    this.setState({loggedIn: false}, localStorage.clear(), alert("You have been logged out"),
    <Redirect to="/" />)
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

            <Route path="/home" render={(routeProps) => <Today {...routeProps} />} />
            
            <Route path="/" render={(routeProps) => (this.state.loggedIn) ? <Redirect to="/home" /> : <LandingPage 
            setUsername={this.setUsername} setPassword={this.setPassword}
            logIn={this.logIn}
            {...routeProps}/>} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
