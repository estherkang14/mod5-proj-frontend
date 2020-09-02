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
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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

const Today = (props) => {
    const classes = useStyles()

    let newDateTime = new Date()
    let dateTime = newDateTime.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    let todaysDate = newDateTime.toLocaleDateString()
    let isoDate = new Date().toISOString().substring(0, 10)

    const [open, setOpen] = React.useState(false)
    const [secondOpen, setSecondOpen] = React.useState(false)
    const [openAddTask, setOpenAddTask] = React.useState(false)

    const [date, setDate] = React.useState("")
    const [mood, setMood] = React.useState("")
    const [struggle, setStruggle] = React.useState("")
    const [thankful, setThankful] = React.useState("")
    const [summary, setSummary] = React.useState("")
    const [userId, setuserId] = React.useState(JSON.parse(localStorage.userId))
    const [dailyPostCreated, toggleDailyPostCreated] = React.useState(false)

    const [title, setNewTitle] = React.useState("")
    const [end_date, setNewEndingDate] = React.useState("")
    const [notes, setNewNotes] = React.useState("")

    const [displayCalendar, toggleCalendar] = React.useState(false)
    
    
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
        setOpen(false)
        toggleDailyPostCreated(true)
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

    const renderDailyPost = () => {
        let todaysPost
        if (props.daily_posts) {
                props.daily_posts.map(post => {if (post.date === isoDate) {todaysPost = post}} )
                if (todaysPost) {return <div> 
                        {todaysPost.day} 
                        <br /><br/>
                        Today, you felt like
                        <br /> 
                        <img src={todaysPost.mood.image} alt="mood color"/>
                        <br /><br/>
                        And you feel like you're struggling with:
                        <br /> 
                        {todaysPost.struggle}
                        <br /><br />
                        But... you're thankful for this:
                        <br />
                        {todaysPost.thankful}
                        <br /><br />
                        And just a recap of today:
                        <br />
                        {todaysPost.summary}
                </div>} else { return "Looks like you don't have a post for today. Go ahead and add one now!"}
        } else {
            return "Looks like you don't have a post for today. Go ahead and add one now!"
        }
    }


    return (
        <div>
            <Container fixed>
                
            <div className={classes.root}>
            
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>{dateTime}</Paper>
                    <Paper className={classes.paper}>*render weather icon/widget here*</Paper>
                    <Paper className={classes.paper}>
                        {/* Modal to Add A Daily Post */}
                        <Modal
                            basic
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            size='small'
                            trigger={<Button> {dailyPostCreated ? "Update Daily Post" : "Add Daily Post" }</Button>}
                            centered={true}
                            closeOnDimmerClick={false}
                            >
                            <Header icon>
                                <Icon name='calendar' />
                                Add a Daily Post
                            </Header>
                            <Modal.Content>
                            
                                <div className="">
                                <form className="ui form" >
                                    <div className="field">
                                        <p>Today's Date (YYYY/MM/DD)</p>
                                        <input name="date" placeholder="e.g., 2020/08/30"
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
                                        onChange={(e) => setStruggle(e.target.value)}></input>
                                    </div>
                                    <br />

                                    <div className="field">
                                        <p>How about something you're thankful for today?</p>
                                        <input name="thankful" placeholder="e.g., what made you happy today?"
                                        onChange={(e) => setThankful(e.target.value)}></input>
                                    </div>
                                    <br />

                                    <div className="field">
                                        <p>Give us a quick summary of your day</p>
                                        <input name="summary" placeholder="e.g., Today, I..."
                                        onChange={(e) => setSummary(e.target.value)}></input>
                                    </div>
                                </form>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                                <Icon name='remove' /> Cancel
                                </Button>
                                <Button color='green' inverted onClick={(e) => createDailyPost(e)}>
                                <Icon name='checkmark' /> Add Post!
                                </Button>
                            </Modal.Actions>
                        </Modal>

                        {/* Modal to View Today's Post */}
                        <Modal
                            basic
                            onClose={() => setSecondOpen(false)}
                            onOpen={() => setSecondOpen(true)}
                            open={secondOpen}
                            size='small'
                            trigger={<Button>View Today's Post</Button>}
                            centered={true}
                            >
                            <Header icon>
                                <Icon name='calendar' />
                                {todaysDate}
                            </Header>
                            <Modal.Content>
                                <div className="">
                                
                                    <br />
                                    {renderDailyPost()}
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={() => setSecondOpen(false)}>
                                <Icon name='remove' /> Close
                                </Button>
                            </Modal.Actions>
                        </Modal>

                        {/* Button for Displaying Today's Calendar */}
                        <br />
                        <Button onClick={() => toggleCalendar(!displayCalendar)}> { displayCalendar ? 
                         "Close Today's Calendar" : "Display Today's Calendar" }</Button>

                        <Modal
                            basic
                            onClose={() => setOpenAddTask(false)}
                            onOpen={() => setOpenAddTask(true)}
                            open={openAddTask}
                            size='small'
                            // trigger={<Button>Add a Task</Button>}
                            closeOnDimmerClick={false}
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
                {/* <Grid item xs={5}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid> */}
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        
                        { props.tasks ? <div>
                            { props.tasks[0] ? `${props.tasks[0].title} 
                                Notes: ${(props.tasks[0].notes ? props.tasks[0].notes : "none")}
                                Complete by: ${(props.tasks[0].end_date ? props.tasks[0].end_date : "N/A")}` : "To-Do: Empty" }
                                <br />
                                { props.tasks[0] ? 
                                    <Button basic color='red' onClick={(e) => props.destroyTask(e, props.tasks[0])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }    

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>

                        { props.tasks ? <div>
                            { props.tasks[1] ? `${props.tasks[1].title} 
                                Notes: ${(props.tasks[1].notes ? props.tasks[1].notes : "none")}
                                Complete by: ${(props.tasks[1].end_date ? props.tasks[1].end_date : "N/A")}` : "To-Do: Empty" }
                                <br />
                                { props.tasks[1] ? 
                                    <Button basic color='red' onClick={(e) => props.destroyTask(e, props.tasks[1])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }    

                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>

                        { props.tasks ? <div>
                            { props.tasks[2] ? `${props.tasks[2].title} 
                                Notes: ${(props.tasks[2].notes ? props.tasks[2].notes : "none")}
                                Complete by: ${(props.tasks[2].end_date ? props.tasks[2].end_date : "N/A")}` : "To-do: Empty" }
                                <br />
                                { props.tasks[2] ? 
                                    <Button basic color='red' onClick={(e) => props.destroyTask(e, props.tasks[2])}>
                                        <Icon name='remove' /> 
                                    </Button>  
                                :   <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                            </div> : <Button basic color='green' onClick={() => setOpenAddTask(true)}>
                                        <Icon name='plus' /> 
                                    </Button>  }
                    </Paper>
                </Grid>
            </Grid>
            </div>
            <div>
                { displayCalendar ? <DayCalendar /> : null }
            </div>
            </Container>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        userEvents: state.userReducer.userEvents,
        moodsForForm: state.userReducer.moods,
        tasks: state.userReducer.tasks,
        daily_posts: state.userReducer.daily_posts
    }
}

export default connect(mapStateToProps)(Today)