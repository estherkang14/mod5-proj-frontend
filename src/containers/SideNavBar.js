import React from 'react';
import { connect } from 'react-redux'

const SideNavBar = () => {

    let date = new Date()
    let time = date.toLocaleTimeString([], {timeStyle: 'short'})
    let dateTime = date.toLocaleString
    let hour = date.getHours()

    let displayWelcome = () => {
        if (localStorage.user) {
            if (hour >= 3 && hour < 12 ) {
                return "Good morning!"
            } else if (hour >= 12 && hour < 18) {
                return "Good afternoon!"
            } else if (hour >= 18 || hour < 3) {
                return "Good evening!"
            }
        }
    }

    return (
        <div className="ui left fixed vertical menu">
            <div className="item"> 
                <div className="menu">{ localStorage.user ? displayWelcome() : dateTime }</div>
                <br/>
                <br/>
                <h3><strong>HOME</strong></h3>
                <div className="menu">
                    <a className="item" href="/home" id="todaynav">
                        Today
                    </a>
                    <a className="item" id="weeknav">
                        This Week
                    </a>
                    <a className="item" href="/month" id="monthnav">
                        This Month
                    </a>
                </div>
            </div>
                

        </div>
    )
}

export default SideNavBar

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps)(SideNavBar);