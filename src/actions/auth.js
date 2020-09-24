// export const processLogin = user => {

// }

export const logIn = user => {
    return (dispatch) => {
        dispatch( { type: 'PROCESS_LOGIN' });
        fetch('http://localhost:3000/users/' + user.id)
            .then(response => response.json())
            .then(userData => {
                localStorage.setItem('userData', JSON.stringify(userData))
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userData.zipcode},us&appid=444f4eae28a53130e131718e48f3fd80&units=imperial`)
                    .then(response => response.json())
                    .then(weather => {
                    localStorage.setItem("weather", JSON.stringify(weather))
                    dispatch( {type: 'STORE_WEATHER', weather})
                    console.log("Weather fetched")
                })
                
                // let nontasks = userData['events'].filter(event => event['event_type'] !== "Task")
                // let tasks = userData['events'].filter(event=> event['event_type'] === "Task")
                
                // localStorage.setItem('userEvents', JSON.stringify(nontasks))
                // localStorage.setItem('daily_posts', JSON.stringify(userData['daily_posts']))
                // localStorage.setItem('tasks', JSON.stringify(tasks))
                // console.log("User Data Fetched")
                // console.log(userData)
                dispatch( { type: 'LOGIN', userData})
        })
    }
}

export const signUp = user => {
    return (dispatch) => {
        dispatch( { type: 'PROCESS_LOGIN' });
        fetch('http://localhost:3000/users/' + user.id)
            .then(response => response.json())
            .then(userData => {
                localStorage.setItem('userData', JSON.stringify(userData))
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userData.zipcode},us&appid=444f4eae28a53130e131718e48f3fd80&units=imperial`)
                    .then(response => response.json())
                    .then(data => {
                    localStorage.setItem("weather", JSON.stringify(data))
                    console.log("Weather fetched")
                })

                dispatch( { type: 'SIGNUP', userData})
        })
    }
}

export const logOut = () => {
    
    return {
        type: 'LOGOUT'
    }
}

export const storeUser = userData => {
    return {
        type: 'STORE_USER_DATA',
        userData
    }
}

export const storeMoods = moods => {
    return {
        type: 'STORE_MOODS',
        moods
    }
}

export const storeHolidays = holidays => {
    return {
        type: 'STORE_HOLIDAYS',
        holidays
    }
}

export const storeDailyPosts = posts => {
    localStorage.daily_posts = JSON.stringify(posts)
    return { 
        type: 'STORE_DAILY_POSTS',
        posts
    }
}

export const storeTasks = tasks => {

    return {
        type: 'STORE_TASKS',
        tasks
    }
}

export const storeEvents = events => {
    localStorage.userEvents = JSON.stringify(events)
    return {
        type: 'STORE_EVENTS',
        events
    }
}

export const storeWeather = weather => {
    return {
        type: 'STORE_WEATHER',
        weather
    }
}

export const deleteUser = user => {
    return {
        type: 'DELETE_USER',
        user
    }
}
