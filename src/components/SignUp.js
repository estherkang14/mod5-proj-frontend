import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/auth'

const defaultState = {
    name: "",
    location: "",
    username: "",
    password: ""
}

class SignUp extends Component {

    state = defaultState
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        let user = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            location: this.state.location
        }
        this.props.signUpFxn(e, user)
        this.props.signUp(user)

        this.setState(defaultState)
    }

    render() {
        return (
            <div className="ui center aligned container">
                <form className="ui small equal width form" onSubmit={(e) => this.handleOnSubmit(e)}>
                    
                        <div className="field">
                            <label>NAME</label>
                            <input placeholder="First name" name="name" 
                            value={this.state.name} onChange={(e) => this.handleOnChange(e)}/>
                        </div>
                        <br/>

                        <div className="field">
                            <label>USERNAME</label>
                            <input placeholder="Username" name="username" 
                            value={this.state.username} onChange={(e) => this.handleOnChange(e)}/>
                        </div>
                        <br/>

                        <div className="field">
                            <label>PASSWORD</label>
                            <input placeholder="Password" name="password" type="password"
                            value={this.state.password} onChange={(e) => this.handleOnChange(e)} />
                        </div>
                        <br />

                        <div className="field">
                            <label>LOCATION</label>
                            <input placeholder="e.g., 'Washington, DC'" name="location" 
                            value={this.state.location} onChange={(e) => this.handleOnChange(e)}/>
                        </div>
                        <br/>
                        <button type="submit" className="ui button">SIGN UP</button>
                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, { signUp })(SignUp)