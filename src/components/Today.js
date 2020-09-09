import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DayCalendar from './DayCalendar'
import { toggleDailyPostButton } from '../actions/calendar'
import { LocalDrink, AddBox, IndeterminateCheckBox } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 330,
      maxHeight: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      //change background color to light grey
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    gridList: {
        width: 350,
        height: 500
    },
    popover: {
        pointerEvents: 'none',
    }
  }));

const Today = (props) => {
    const classes = useStyles()
    
    let newDateTime = new Date()
    let dateTime = newDateTime.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})

    let isoDate = new Date().toISOString().substring(0, 10)
    let hour = newDateTime.getHours()

    const [timeForIcon, setTimeForIcon] = React.useState("")
    const [iconTag, setIconTag] = React.useState("")

    const [dailyPostMade, toggleDailyPostMade] = React.useState(false)
    const [test, toggleTest] = React.useState({})

    const [weather, setWeather] = React.useState({})

    let todaysPost
    React.useEffect(() => { 
       
      
        if (props.daily_posts) {
        props.daily_posts.map(post => {if (post.date === isoDate) {
            todaysPost = post
            toggleTest(post)
            toggleDailyPostMade(true)
        }} )  
        } 
        
        if (6 < hour < 18) {
            setTimeForIcon("d")
        } else if ( 24 > hour > 18 || hour < 6) {
            setTimeForIcon("n")
        }
        if (props.weatherInfo.temperature) {renderWeatherIcon() } 

        let sorted = props.daily_posts.sort((a,b) => (b.id - a.id))

    }, [props.daily_posts, props.tasks, props.weatherInfo])

    const [open, setOpen] = React.useState(false)
    const [secondOpen, setSecondOpen] = React.useState(false)
    const [openAddTask, setOpenAddTask] = React.useState(false)

    const [date, setDate] = React.useState(isoDate)
    const [mood, setMood] = React.useState("")
    const [struggle, setStruggle] = React.useState("")
    const [thankful, setThankful] = React.useState("")
    const [summary, setSummary] = React.useState("")

    const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId))

    const [title, setNewTitle] = React.useState("")
    const [end_date, setNewEndingDate] = React.useState("")
    const [notes, setNewNotes] = React.useState("")

    const [displayCalendar, toggleCalendar] = React.useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverDisplay, setPopoverDisplay] = React.useState(null)
    

    const createDailyPost = (e) => {
        let info = {
            date,
            mood_id: mood,
            struggle,
            thankful,
            summary,
            user_id: userId
        }
        props.postDailyPost(e, info)
        toggleTest(test)
        setOpen(false)
        toggleDailyPostMade(true)
        
    }

    const updateDailyPost = (e) => {

        let info = {
            date,
            mood_id: mood,
            struggle,
            thankful,
            summary,
            user_id: userId
        }
        let postId = test.id
        
        props.updateDailyPost(e, info, postId)
        setOpen(false)
    }

    const renderEvents = () => {
        console.log(JSON.parse(localStorage.userId)) 
    }

    const createNewTask = (e) => {
        let taskinfo = {
            title,
            end_date,
            notes,
            user_id: userId,
            event_type: "Task"
        }

        props.addEventForUser(e, taskinfo)
        setOpenAddTask(false)
    }

    const addWater = (e) => {
        let info = {
            water: test.water + 1
        }

        let postId = test.id
        toggleTest({...test, water: test.water + 1})

        props.updatePostWater(e, info, postId)
    }

    const removeWater = (e) => {
        if (test.water >= 1) {
            let info = {
                water: test.water - 1
            }
            let postId = test.id
            toggleTest({...test, water: test.water - 1})

            props.updatePostWater(e, info, postId)
        } else {
            alert("Sorry, you can't have less than 0 cups of water!")
        }
    }

    const renderDailyPost = () => {
        
        if (props.daily_posts) {
            let todaysPost
                props.daily_posts.map(post => {if (post.date === isoDate) {
                    todaysPost = post
                }} )
                if (todaysPost) {return <div> 
                        {todaysPost.day} 
                        <br />
                        <strong>Today, you felt like</strong>
                        <br /> 
                        <img src={todaysPost.mood.image} alt="mood color" className="moodImage"/>
                        <br /><br/>
                        <strong>And you feel like you're struggling with:</strong>
                        <br /> 
                        {todaysPost.struggle}
                        <br /><br />
                        <strong>But... you're thankful for this:</strong>
                        <br />
                        {todaysPost.thankful}
                        <br /><br />
                        <strong>And just a recap of today:</strong>
                        <br />
                        {todaysPost.summary}
                        <br /><br/>
                        {<LocalDrink fontSize="medium" color="primary"/>}: {todaysPost.water}
                        <br/>
                        {<IndeterminateCheckBox fontSize="small" onClick={(e) => removeWater(e)}/>} | { <AddBox fontSize="small" onClick={(e) => addWater(e)} />}
                </div>} else { return "Looks like you don't have a post for today. Go ahead and add one now !!"}
        } else {
            return "Looks like you don't have a post for today. Go ahead and add one now!"
        }
    }


    const openPostModal = () => {
        let todaysPost
        if (props.daily_posts) {
                props.daily_posts.map(post => {if (post.date === isoDate) {todaysPost = post}})
        }
        
        if (dailyPostMade) {
            setMood(todaysPost.mood_id)
            setStruggle(todaysPost.struggle)
            setThankful(todaysPost.thankful)
            setSummary(todaysPost.summary)
            toggleDailyPostMade(true)
            toggleTest(todaysPost)
        } 
        setOpen(true)
    }

    const renderWeatherIcon = () => {
        if (props.weatherInfo.desc.main === "Thunderstorm") {
            setIconTag("11")
        } else if (props.weatherInfo.desc.main === "Drizzle") {
            setIconTag("09")
        } else if (props.weatherInfo.desc.main === "Rain") {
            setIconTag("10")
        } else if (props.weatherInfo.desc.main === "Clear") {
            setIconTag("01")
        } else if (props.weatherInfo.desc.main === "Clouds") {
            setIconTag("04")
        } else if (props.weatherInfo.desc.main === "Snow") {
            setIconTag("13")
        } else if (props.weatherInfo.desc.main === "Smoke") {
            setIconTag("50")
        } else if (props.weatherInfo.desc.main === "Mist") {
            setIconTag("50")
        } else if (props.weatherInfo.desc.main === "Fog") {
            setIconTag("50")
        } else if (props.weatherInfo.desc.main === "Haze") {
            setIconTag("50")
        }
    }

    const handlePopoverOpen = (e) => {
        props.daily_posts.map(post => {if (post.date === e.target.innerText) { setPopoverDisplay(post) }})

        setAnchorEl(e.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }
    
    const popoverOpen = Boolean(anchorEl)

  
    return (
        <div>
            <Container fixed>
                
            <div className={classes.root.flexGrow}>
            
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>{dateTime}</Paper>
                    <Paper className={classes.paper}>
                        {props.weatherInfo.temperature ? <div>
                            <div className="weathericon">
                                <img src={`http://openweathermap.org/img/wn/${iconTag}${timeForIcon}@2x.png`} alt="weather icon"/> <br/>
                            </div>
                            <div className="weatherinfo">
                            <strong>Current:</strong> {props.weatherInfo.temperature.temp} F and {props.weatherInfo.desc.main} <br/>
                            <strong>Feels like:</strong> {props.weatherInfo.temperature.feels_like} F <br/>
                            <strong>Low:</strong> {props.weatherInfo.temperature.temp_min} F <br />
                            <strong>High:</strong> {props.weatherInfo.temperature.temp_max} F <br/>
                            </div>
                        </div> : "Weather loading..."}
                        
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <Paper className={classes.paper} style={{maxHeight: 340, overflow: 'auto'}}>
                        {/* Modal to Add A Daily Post */}
                        {renderDailyPost()}<br/>
                        <Modal
                            basic
                            onClose={() => setOpen(false)}
                            onOpen={() => openPostModal()}
                            open={open}
                            size='small'
                            trigger={<Button basic size="tiny"> {dailyPostMade ? "Update Daily Post" : "Add Daily Post" }</Button>}
                            centered={true}
                            closeOnDimmerClick={false}
                            className="modal"
                            >
                            <Header icon>
                                <Icon name='calendar' />
                                {dailyPostMade ? "Update Daily Post" : "Add Daily Post" }
                            </Header>
                            <Modal.Content>
                            
                                <div className="">
                                <form className="ui form" >
                                    <div className="field">
                                        <p>Today's Date (YYYY/MM/DD)</p>
                                        <input name="date" placeholder="e.g., 2020/08/30" value={date}
                                        onChange={(e) => setDate(e.target.value)}></input>
                                    </div>
                                    <br />
                                   
                                    <div className="field">
                                        <p>What color best describes your mood today?</p>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Choose One</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={mood}
                                                onChange={(e) => setMood(e.target.value)}
                                                label="Mood Colors"
                                            >
                                            <MenuItem value={props.moodsForForm[0]['id']}>
                                                <img src={props.moodsForForm[0]['image']} alt="red" />
                                            </MenuItem>
                                            <MenuItem value={props.moodsForForm[1]['id']}>
                                                <img src={props.moodsForForm[1]['image']} alt="orange"/>
                                            </MenuItem>
                                            <MenuItem value={props.moodsForForm[2]['id']}>
                                                <img src={props.moodsForForm[2]['image']} alt="green"/>
                                            </MenuItem>
                                            <MenuItem value={props.moodsForForm[3]['id']}>
                                                <img src={props.moodsForForm[3]['image']} alt="blue"/>
                                            </MenuItem>
                                            <MenuItem value={props.moodsForForm[4]['id']}>
                                                <img src={props.moodsForForm[4]['image']} alt="lavender"/>
                                            </MenuItem>
                                            <MenuItem value={props.moodsForForm[5]['id']}>
                                                <img src={props.moodsForForm[5]['image']} alt="pink"/>
                                            </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <br />

                                    <div className="field">
                                        <p>What is something you are struggling with today?</p>
                                        <input name="struggle" placeholder="e.g., what's stressing you out?"
                                        onChange={(e) => setStruggle(e.target.value)} value={struggle}></input>
                                    </div>
                                    <br />

                                    <div className="field">
                                        <p>How about something you're thankful for today?</p>
                                        <input name="thankful" placeholder="e.g., what made you happy today?"
                                        onChange={(e) => setThankful(e.target.value)} value={thankful}></input>
                                    </div>
                                    <br />

                                    <div className="field">
                                        <p>Give us a quick summary of your day</p>
                                        <input name="summary" placeholder="e.g., Today, I..."
                                        onChange={(e) => setSummary(e.target.value)} value={summary}></input>
                                    </div>
                                </form>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                                <Icon name='remove' /> Cancel
                                </Button>
                                <Button color='green' inverted onClick={(e) => {dailyPostMade ? 
                                    updateDailyPost(e) : createDailyPost(e)}}>
                                <Icon name='checkmark' /> {dailyPostMade ? "Update" : "Add Post!"}
                                </Button>
                            </Modal.Actions>
                        </Modal>
                        
                    </Paper>
    
                </Grid>
                {/* RENDER ALL DAILY POSTS HERE */}
                <Grid item sm>
                    <Paper className={classes.paper} style={{maxHeight: 340, overflow: 'auto'}}>
                        <List className={classes.root.width, classes.root.maxWidth, classes.root.backgroundColor,
                        classes.root.position, classes.root.overflow, classes.root.maxHeight} >
                            <h4>Your previous daily posts:</h4>
                            {props.daily_posts ? <div> {props.daily_posts.map(post => <div>
                            <ListItem aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true"
                             >
                                <Button size="mini" basic color={post.mood.hexcode} onClick={handlePopoverOpen} 
                                onMouseLeave={handlePopoverClose}>{post.date}</Button>
                            </ListItem>
                            
                            </div>
                                )} </div> : "Looks like you don't have any previous daily posts. Get started now!"}
                            
                        </List>
                        {anchorEl ? <div><Popover id='mouse-over-popover' className={classes.popover}
                            classes={{paper: classes.paper}} open={popoverOpen} anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            transformOrigin={{vertical: 'top', horizontal:'left'}} 
                            onClose={handlePopoverClose} disableRestoreFocus> 
                                <strong>Your mood was:</strong>
                                <img src={popoverDisplay.mood.image} alt="mood color" className="moodImagePopover"/>
                                <br />
                                <strong>And you were struggling with:</strong> {popoverDisplay.struggle}
                                <br />
                                <strong>But... you were thankful for:</strong> {popoverDisplay.thankful}
                                <br />
                                <strong>Quick recap:</strong> {popoverDisplay.summary}
                                <br />
                                {<LocalDrink fontSize="small" color="primary"/>}: {popoverDisplay.water}
                            </Popover> </div> : null }
                        
                    </Paper>
                </Grid>
                
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        
                        { props.tasks ? <div>
                            { props.tasks[0] ? <div><strong>{props.tasks[0].title}</strong>
                                <br/><strong>Complete by:</strong> {props.tasks[0].end_date ? props.tasks[0].end_date : "N/A"} 
                                <br/><strong>Notes:</strong> {props.tasks[0].notes ? props.tasks[0].notes : "none"}
                                </div> : "To-do: Empty"}
                                <br />
                                { props.tasks[0] ? 
                                    <Button size="tiny" basic color='red' onClick={(e) => props.destroyTask(e, props.tasks[0])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button size="tiny" basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button size="tiny" basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }    

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>

                        { props.tasks ? <div>
                            {/* { props.tasks[1] ? `${props.tasks[1].title} 
                                Notes: ${(props.tasks[1].notes ? props.tasks[1].notes : "none")}
                                Complete by: ${(props.tasks[1].end_date ? props.tasks[1].end_date : "N/A")}` : "To-Do: Empty" } */}
                            { props.tasks[1] ? <div><strong>{props.tasks[1].title}</strong>
                                <br/><strong>Complete by:</strong> {props.tasks[1].end_date ? props.tasks[1].end_date : "N/A"} 
                                <br/><strong>Notes:</strong> {props.tasks[1].notes ? props.tasks[1].notes : "none"}
                                </div> : "To-do: Empty"}
                                <br />
                                { props.tasks[1] ? 
                                    <Button size="tiny" basic color='red' onClick={(e) => props.destroyTask(e, props.tasks[1])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button size="tiny" basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button size="tiny" basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }    

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>

                        { props.tasks ? <div>
                            { props.tasks[2] ? <div><strong>{props.tasks[2].title}</strong>
                                <br/><strong>Complete by:</strong> {props.tasks[2].end_date ? props.tasks[2].end_date : "N/A"} 
                                <br/><strong>Notes:</strong> {props.tasks[2].notes ? props.tasks[2].notes : "none"}
                                </div> : "To-do: Empty"}
                                <br />
                                { props.tasks[2] ? 
                                    <Button basic size="tiny" color='red' onClick={(e) => props.destroyTask(e, props.tasks[2])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button basic size="tiny" color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button basic size="tiny" color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>

                        {/* Button for Displaying Today's Calendar */}
                        <br />
                        <Button basic onClick={() => toggleCalendar(!displayCalendar)}> { displayCalendar ? 
                         "Close Today's Calendar" : "Display Today's Calendar" }</Button>

                        <div>
                            { displayCalendar ? <DayCalendar /> : null }
                        </div>

                        <Modal
                            basic
                            onClose={() => setOpenAddTask(false)}
                            onOpen={() => setOpenAddTask(true)}
                            open={openAddTask}
                            size='small'
                            // trigger={<Button>Add a Task</Button>}
                            closeOnDimmerClick={false}
                            className="modal"
                            >
                            <Header icon>
                                <Icon name='calendar' />
                                Add a New To-Do Item!
                            </Header>
                            <Modal.Content>
                                <div>
                                    <form className="ui form">
                                        <div className="field">
                                            <p>Title</p>
                                            <input name="title" placeholder="e.g., Go Grocery Shopping"
                                            onChange={(e) => setNewTitle(e.target.value)}></input>
                                        </div>
                                        <br />

                                        <div className="field">
                                            <p>Due Date, if applicable (YYYY/MM/DD)</p>
                                            <input name="end" placeholder="e.g., 2020/08/31"
                                            onChange={(e) => setNewEndingDate(e.target.value)}></input>
                                        </div>
                                        <br />

                                        <div className="field">
                                            <p>Notes</p>
                                            <input name="notes" placeholder="e.g., 'Avocados, chips, cookie dough'"
                                            onChange={(e) => setNewNotes(e.target.value)}></input>
                                        </div>
                                        <br />
                                    </form>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={() => setOpenAddTask(false)}>
                                <Icon name='remove' /> Cancel/Close
                                </Button>
                                <Button color='green' inverted onClick={(e) => createNewTask(e)}>
                                <Icon name='checkmark' /> Add Item!
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Paper>
                </Grid>
            </Grid>
            </div>
            </Container>
        </div>
    ) 
    
}

const mapStateToProps = state => {
    return {
        userEvents: state.userEvents,
        moodsForForm: state.moods,
        tasks: state.tasks,
        daily_posts: state.daily_posts,
        toggle_daily_post: state.toggle_daily_post,
        weatherInfo: state.weatherInfo
    }
}

export default connect(mapStateToProps, toggleDailyPostButton)(Today)