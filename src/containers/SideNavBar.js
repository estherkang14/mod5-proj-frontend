import React from 'react';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import Logo from '../components/logo.png'
import TodayLogo from '../components/todaylogo.jpg'
import CalendarLogo from '../components/calendarlogo.jpg'
import LogOutLogo from '../components/logoutlogo.jpg'
import DeleteLogo from '../components/deletelogo.png'
import UpdateAccountLogo from '../components/update.png'

import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  list: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  credits: {
      position: "fixed",
      bottom: 0,
      textAlign: 'center',
      paddingBottom: 10,
  }
}));

const SideNavBar = (props) => {

  const [openUpdateProfile, setOpenUpdateProfile] = React.useState(false)


  const [accountName, setNewName] = React.useState(props.userData.name)
  const [username, setNewUsername] = React.useState(props.userData.username)
  // const [password, setNewPassword] = React.useState(props.userData.password)
  const [zipcode, setNewZipcode] = React.useState(props.userData.zipcode)
  const [location, setNewLocation] = React.useState(props.userData.location)

  // const [accountName, setNewName] = React.useState("")
  // const [username, setNewUsername] = React.useState("")
  // const [password, setNewPassword] = React.useState("")
  // const [zipcode, setNewZipcode] = React.useState("")
  // const [location, setNewLocation] = React.useState("")

  React.useEffect(() => {
    console.log("hi")
  }, [props.userData])

    const classes = useStyles();
    let date = new Date()
    let time = date.toLocaleTimeString([], {timeStyle: 'short'})
    let dateTime = date.toLocaleString
    let hour = date.getHours()
    let name
    if (localStorage.loggedIn) {name = localStorage.getItem('name')}

    let displayWelcome = () => {
        if (localStorage.loggedIn) {
            if (hour >= 3 && hour < 12 ) {
                return `Good morning, ${name}!`
            } else if (hour >= 12 && hour < 18) {
                return `Good afternoon, ${name}!`
            } else if (hour >= 18 || hour < 3) {
                return `Good evening, ${name}!`
            }
        }
    }

    let updateProfile = (e) => {
      let info = {
        accountName,
        username,
        // password,
        zipcode,
        location
      }
      console.log("update profile clicked")
      // props.updateProfile(e, info)
      setOpenUpdateProfile(false)
    }

    let cancelUpdate = (e) => {
      setNewName(props.userData.name)
      setNewUsername(props.userData.username)
      // setNewPassword("")
      setNewZipcode(props.userData.zipcode)
      setNewLocation(props.userData.location)
      setOpenUpdateProfile(false)

    }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div />
          {/* <div className={classes.toolbar} /> */} <br /> <br /> <br /> <br /> 
            <div><img src={Logo} alt="your day logo" className="logo-image" /></div> <br/>
            <div>{ localStorage.loggedIn ? displayWelcome() : <div>Log in or sign up to get started!</div> }</div> 
          <Divider />
          {localStorage.loggedIn ? <div>
                <List className={classes.list}>
                <a href="/home" id="homenav">
                    <ListItem button className={classes.list}>
                        <img src={TodayLogo} className="sideNavImg" alt="today navigation" />
                    </ListItem>
                </a>
                <a href="/calendar" id="calendarnav">
                    <ListItem button className={classes.list}>
                        <img src={CalendarLogo} className="sideNavImg" alt="calendar navigation" />
                    </ListItem>
                </a>
                </List>
            <Divider />
                <List className={classes.list}>
                    <ListItem button onClick={(e) => {props.logOut(e)}} className={classes.list}>
                        <img src={LogOutLogo} className="sideNavImg" alt="log out navigation" />
                    </ListItem> 
                </List>
            <Divider />
            {/* add update account button. NEED TO HAVE ON CLICK FUNCTION*/}
              <List className={classes.list}>
                <ListItem button className={classes.list}
                onClick={(e) => setOpenUpdateProfile(true)}
                >
                  <img src={UpdateAccountLogo} className="sideNavImgDel" alt="update account navigation" />
                </ListItem>
              </List>
            <Divider />
            

            {/* delete account button */}
                <List className={classes.list}>
                  <ListItem button className={classes.list} 
                  onClick={(e) => {if(window.confirm("Are you sure want to delete your account?")){props.deleteAccount(e)}}}>
                      <img src={DeleteLogo} className="sideNavImgDel" alt="delete account navigation" />
                  </ListItem> 
                </List>
            <Divider />


                
          </div> : null }
              <List className={classes.credits}>
                  <ListItem className={classes.list}>
                      Created by: Esther Kang (2020)
                  </ListItem>
                  <ListItem className={classes.list}>
                      <a href="https://github.com/estherkang14" style={{color: 'black'}}><Icon size="large" name='github'/></a>
                  </ListItem>
                  <ListItem className={classes.list}>
                      <a href="https://www.linkedin.com/in/esther-kang/" style={{color: 'black'}}><Icon size="large" name='linkedin'/></a>
                  </ListItem>
                  
              </List>
        </Drawer>
        {/* DIV FOR MODAL TO UPDATE PROFILE */}
        <div>
            {/* PUT MODAL HERE TO UPDATE PROFILE INFO - MAINLY TO CHANGE ZIPCODE  */}

            <Modal
              basic
              onClose={() => setOpenUpdateProfile(false)}
              onOpen={() => setOpenUpdateProfile(true)}
              open={openUpdateProfile}
              size='small'
              closeOnDimmerClick={false}
              className="modal"
              >
              <Header icon>
                  <Icon name='calendar' />
                  Update your profile!
              </Header>
              <Modal.Content>
                  <div>
                      <form className="ui form">
                          <div className="field">
                              <p>Name*</p>
                              <input name="name" placeholder="name placeholder" value={accountName}
                              onChange={(e) => setNewName(e.target.value)}></input>
                          </div>
                          <br />

                          <div className="field">
                              <p>Username*</p>
                              <input name="username" placeholder="username placeholder" value={username}
                              onChange={(e) => setNewUsername(e.target.value)}></input>
                          </div>
                          <br />
                          {/* // maybe don't include password change? */}
                          {/* <div className="field">
                              <p>Password</p>
                              <input name="password" placeholder="password placeholder" value={password}
                              onChange={(e) => setNewPassword(e.target.value)}></input>
                          </div>
                          <br /> */}
                          <div className="field">
                              <p>Zipcode</p>
                              <input name="zipcode" placeholder="zipcode placeholder" value={zipcode}
                              onChange={(e) => setNewZipcode(e.target.value)}></input>
                          </div>
                          <br />
                          <div className="field">
                              <p>Location</p>
                              <input name="location" placeholder="location placeholder" value={location}
                              onChange={(e) => setNewLocation(e.target.value)}></input>
                          </div>
                          <br />
                      </form>
                  </div>
              </Modal.Content>
              <Modal.Actions>
                  <Button basic color='red' inverted onClick={() => cancelUpdate()}>
                  <Icon name='remove' /> Cancel/Close
                  </Button>
                  <Button color='green' inverted onClick={(e) => updateProfile(e)}>
                  <Icon name='checkmark' /> Update Profile!
                  </Button>
              </Modal.Actions>
            </Modal>
        </div>
      </div>
    )
}

const mapStateToProps = state => {
  if (localStorage.loggedIn ) {
    return {
        userData: state.userData
    }
  }
}

export default connect(mapStateToProps)(SideNavBar);