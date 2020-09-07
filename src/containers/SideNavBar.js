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

const drawerWidth = 200;

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
}));

const SideNavBar = (props) => {

    const classes = useStyles();
    let date = new Date()
    let time = date.toLocaleTimeString([], {timeStyle: 'short'})
    let dateTime = date.toLocaleString
    let hour = date.getHours()
    let name
    if (localStorage.loggedIn) {name = props.userData.name}

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
          <div className={classes.toolbar} />
          <div>{ localStorage.loggedIn ? displayWelcome() : <div>Log in or sign up to get started!</div> }</div> 
          <Divider />
          {localStorage.loggedIn ? <div>
                <List>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))} */}
                <a href="/home" id="homenav">
                    <ListItem button>
                        <ListItemText primary="TODAY"/>
                    </ListItem>
                </a>
                <a href="/calendar" id="calendarnav">
                    <ListItem button>
                        <ListItemText primary="CALENDAR" />
                    </ListItem>
                </a>
                </List>
            <Divider />
                <List>
                    <ListItem button onClick={(e) => {this.props.logOut(e)}}>
                        <ListItemText primary="LOG OUT" />
                    </ListItem> 
                </List>
          </div> : null }
          
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
    return {
        userData: state.userReducer.userData
    }
}

export default connect(mapStateToProps)(SideNavBar);