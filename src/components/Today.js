import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Today = () => {
    const classes = useStyles()

    let newDateTime = new Date()
    let dateTime = newDateTime.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    let date = newDateTime.toLocaleDateString()

    
    return (
        <div>
            <Container fixed>
                
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>{dateTime}</Paper>
                    <Paper className={classes.paper}>render weather if you can</Paper>
                    <Paper className={classes.paper}>render buttons for adding/viewing daily post and adding new task/event</Paper>
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
                    <Paper className={classes.paper}>render task/event</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>render task/event</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>render task/event</Paper>
                </Grid>
            </Grid>
            </div>
            </Container>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Today)