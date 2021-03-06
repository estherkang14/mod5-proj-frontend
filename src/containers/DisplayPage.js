import React from 'react'
import Today from '../components/Today'
import {Redirect} from 'react-router-dom'

const DisplayPage = (props) => {

    if (localStorage.userId) {
        return (
            <div className="main_container">
                <Today postDailyPost={props.postDailyPost} addEventForUser={props.addEventForUser}
                destroyTask={props.destroyTask} updateDailyPost={props.updateDailyPost} updatePostWater={props.updatePostWater}/>
            </div>
        )
    } else {
        console.log("help")
        alert("You must be logged in to view this page")
        return ( <Redirect to="/" /> )
    }
}

export default DisplayPage