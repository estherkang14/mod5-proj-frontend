import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/auth'

const defaultState = {
    username: "",
    password: ""
}

class LogIn extends Component {

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
            password: this.state.password
        }
        this.props.logInFxn(e, user)
        this.props.logIn(user)

        this.setState(defaultState)
    }

    render() {
        return (
            <div className="ui center aligned container">
                <form className="ui small equal width form" onSubmit={(e) => this.handleOnSubmit(e)}>
                    
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
                        <button type="submit" className="ui button">LOGIN</button>
                    
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

export default connect(mapStateToProps, { logIn })(LogIn)