import React from 'react';
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



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
    flexGrow: 1,
    // maxWidth: 330,
    // maxHeight: 360,
    // position: 'relative',
    // overflow: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const LandingPage = (props) => {
    
    const classes = useStyles();
    const firstclasses = [classes.root.backgroundColor, classes.root.width].join(' ')
    const secondclasses = [classes.root.backgroundColor, classes.root.flexGrow, classes.root.maxWidth, 
      classes.root.maxHeight, classes.root.position, classes.root.overflow].join(' ')

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
      <div>
      <Container fixed>
                
      <div className={classes.root.flexGrow}>
      
      <Grid container spacing={3}>
          <Grid item sm={12}>
          <Paper className={classes.paper}>
          <div className={firstclasses}>
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
          </Paper>
        </Grid>
        </Grid>

        </div>
        </Container>
        </div>
    );
}

export default LandingPage