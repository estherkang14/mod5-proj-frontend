import React from 'react';
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'


const LandingPage = (props) => {

    return (
        <div className="maincontainer">
            {/* <br /> <br /> <br /> */}
            Render a 'welcome/please log in or sign up' Card here
            <br />
            With two buttons - one for log in, one for sign up
            <br />
            that toggle between the log in or sign up form, respectively
            <br />
            <LogIn logInFxn={props.logIn}/>
            <br />
            <SignUp signUpFxn={props.signUp} />
        </div>
    )
}

export default LandingPage