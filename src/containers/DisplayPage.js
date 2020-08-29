import React from 'react'
import Today from '../components/Today'
import {Redirect} from 'react-router-dom'

const DisplayPage = () => {

    if (localStorage.user) {
        return (
            <div className="main_container">
                <Today />
            </div>
        )
    } else {
        alert("You must be logged in to view this page")
        return ( <Redirect to="/" /> )
    }
}

export default DisplayPage