import React from 'react';
import { connect } from 'react-redux'

const SideNavBar = () => {
    return (
        <div className="ui left fixed vertical menu">
            <div className="item"> 
                <div className="menu">Welcome, User</div>
                <br/>
                <br/>
                <h3><strong>HOME</strong></h3>
                <div className="menu">
                    <a className="item" id="todaynav">
                        Today
                    </a>
                    <a className="item" id="weeknav">
                        This Week
                    </a>
                    <a className="item" id="monthnav">
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