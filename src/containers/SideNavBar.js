import React from 'react';
import { connect } from 'react-redux'

const SideNavBar = (props) => {

    let date = new Date()
    let time = date.toLocaleTimeString([], {timeStyle: 'short'})
    let dateTime = date.toLocaleString
    let hour = date.getHours()
    let name
    if (localStorage.loggedIn) {name = props.userData.name}

    let displayWelcome = () => {
        if (localStorage.loggedIn) {
            if (hour >= 3 && hour < 12 ) {
                return `Good morning, ${name}!`
            } else if (hour >= 12 && hour < 18) {
                return `Good afternoon, ${name}!`
            } else if (hour >= 18 || hour < 3) {
                return `Good evening, ${name}!`
            }
        }
    }

    return (
        <div className="ui left fixed vertical menu">
            <div className="item"> 
                <div className="menu">{ localStorage.loggedIn ? displayWelcome() : dateTime }</div>
                <br/>
                <br/>
                {/* <h3><strong>HOME</strong></h3> */}
                <div className="menu">
                    <a className="item" href="/home" id="todaynav">
                        TODAY
                    </a>
                    
                    <a className="item" href="/month" id="monthnav">
                        MONTH
                    </a>
                </div>
            </div>
                

        </div>
    )
}

// export default SideNavBar

const mapStateToProps = state => {
    return {
        userData: state.userReducer.userData
    }
}

export default connect(mapStateToProps)(SideNavBar);