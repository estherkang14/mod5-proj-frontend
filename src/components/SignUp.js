import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/auth'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const SignUp = (props) => {

    const classes = useStyles();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [zipcode, setZipcode] = useState("")

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let user = {
            username,
            password,
            name,
            location,
            zipcode
        }
        props.signUpFxn(e, user)

        setUsername("")
        setPassword("")
        setName("")
        setLocation("")
        setZipcode("")
    }

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              CREATE AN ACCOUNT
            </Typography>
            <form className={classes.form} noValidate onSubmit={(e) => handleOnSubmit(e)}> 
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="NAME"
                    name="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="USERNAME"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="PASSWORD"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zipcode"
                    label="ZIPCODE"
                    name="zipcode"
                    onChange={(e) => setZipcode(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="location"
                    label="LOCATION"
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                />
                
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    SIGN UP
                </Button>
                
            </form>
        </div>
        </Container>
      );

    
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, { signUp })(SignUp)