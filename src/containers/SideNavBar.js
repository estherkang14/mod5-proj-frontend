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

import { Icon } from 'semantic-ui-react'

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
    // {name = props.userData.name}

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

    return (
        <div className={classes.root}>
        <CssBaseline />
        {/* <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Permanent drawer
            </Typography>
          </Toolbar>
        </AppBar> */}
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
      </div>
    )

    // return (
    //     <div className="ui left fixed vertical menu">
    //         <div className="item"> 
    //             <div className="menu">{ localStorage.loggedIn ? displayWelcome() : dateTime }</div>
    //             <br/>
    //             <br/>
    //             {/* <h3><strong>HOME</strong></h3> */}
    //             <div className="menu">
    //                 <a className="item" href="/home" id="todaynav">
    //                     TODAY
    //                 </a>
                    
    //                 <a className="item" href="/calendar" id="calendarnav">
    //                     CALENDAR
    //                 </a>
    //             </div>
    //         </div>
                

    //     </div>
    // )
}

// export default SideNavBar

const mapStateToProps = state => {
  if (localStorage.loggedIn ) {
    return {
        userData: state.userData
    }
  }
}

export default connect(mapStateToProps)(SideNavBar);