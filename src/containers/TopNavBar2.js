import React, { Component } from 'react';
import { connect } from 'react-redux'

class TopNavBar extends Component {


    render() {
        return (
            <div className='ui fixed menu'>
                {/* <div> 
                    <div className="item">Welcome, -render user name-</div>
                </div> */}
                
                <div className="right menu">
                    
                    {/* {this.props.loggedIn ? <a className="item menu-item" href="/" onClick={(e) => {this.props.logOut(e)}}>Log Out</a>
                    : null} */}
                    <a className="item menu-item" href="/" onClick={(e) => {this.props.logOut(e)}}>Log Out</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn 
    }
}

export default connect(mapStateToProps)(TopNavBar);