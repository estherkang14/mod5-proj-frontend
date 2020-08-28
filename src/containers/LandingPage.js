import React from 'react';
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const LandingPage = (props) => {
    
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="LOGIN" {...a11yProps(0)} />
            <Tab label="SIGN UP" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <LogIn logInFxn={props.logIn}/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <SignUp signUpFxn={props.signUp}/>
            </TabPanel>
        </SwipeableViews>
        </div>
    );
    // return (
    //     <div>
    //         <Container component="main" maxWidth="xs">
            
    //         {/* <br /> <br /> <br /> */}
    //         <div className={{display: "flex", flexDirection: 'column', alignItens: 'center'}} >
    //             Render a 'welcome/please log in or sign up' Card here
    //             <br />
    //             With two buttons - one for log in, one for sign up
    //             <br />
    //             that toggle between the log in or sign up form, respectively
    //             <br />
    //             <LogIn logInFxn={props.logIn}/>
    //             <br />
    //             <SignUp signUpFxn={props.signUp} />
    //             {/* {logIn ? <LogIn logInFxn={props.logIn} /> : <SignUp signUpFxn={props.signUp} />} */}
    //         </div>
    //         </Container>
    //     </div>
    // )
}

export default LandingPage