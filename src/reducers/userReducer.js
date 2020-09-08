// let user = JSON.parse(localStorage.getItem('user')); 
let initialState
// let daily_posts = JSON.parse(localStorage.getItem('userData')['daily_posts'])
// let user_events = JSON.parse(localStorage.getItem('userData')['user_events'])
// if (daily_posts && user_events) {

if (localStorage.loggedIn) {
    let dailyPost
    if (localStorage.dailyPost) {
        dailyPost = true
    } else {
        dailyPost = false
    }

    initialState = { loggedIn: localStorage.getItem('loggedIn'), 
    userData: JSON.parse(localStorage.getItem('userData')),
    moods: JSON.parse(localStorage.getItem('moods')), 
    daily_posts: (JSON.parse(localStorage.getItem('daily_posts'))),
    user_events: (JSON.parse(localStorage.getItem('userEvents'))), 
    tasks: (JSON.parse(localStorage.getItem('tasks'))), 
    holidays: (JSON.parse(localStorage.getItem('holidays'))),
    weatherInfo: {temperature: JSON.parse(localStorage.getItem('weather')).main, desc: JSON.parse(localStorage.getItem('weather')).weather[0]},
    toggle_daily_post: dailyPost
}

} else {
    // initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
    // moods: JSON.parse(localStorage.getItem('moods')) }

    initialState = { loggedIn: false,
    userData: {}, 
    moods: JSON.parse(localStorage.getItem('moods')),
    holidays: JSON.parse(localStorage.getItem('holidays')),
    tasks: [],
    daily_posts: [],
    user_events: [],
    weatherInfo: {},

    }
}


// } else if (daily_posts) {
//     initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
//     moods: JSON.parse(localStorage.getItem('moods')), daily_posts: (JSON.parse(localStorage.getItem('userData'))['daily_posts']) }
// } else if (user_events) {
//     initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
//     moods: JSON.parse(localStorage.getItem('moods')), user_events: (JSON.parse(localStorage.getItem('userData'))['user_events']) }
// } else {
//     initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
//     moods: JSON.parse(localStorage.getItem('moods')) }
// }
// , daily_posts: (JSON.parse(localStorage.getItem('userData'))['daily_posts']),
// user_events: (JSON.parse(localStorage.getItem('userData'))['user_events'])
// initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
// moods: JSON.parse(localStorage.getItem('moods')) }


export default function userReducer (state = initialState, action) {
    
    let newState

    switch(action.type) {
        case 'PROCESS_LOGIN':
            return {
                ...state,
                processing_login: true
            }
        case 'LOGIN':
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${action.userData.zipcode},us&appid=444f4eae28a53130e131718e48f3fd80&units=imperial`)
                .then(response => response.json())
                .then(data => {
                localStorage.setItem("weather", JSON.stringify(data))
                console.log("Weather fetched")
            })
            return {
                ...state,
                loggedIn: true,
                userData: action.userData,
                processing_login: false,
                user_events: action.userData.events.filter(event => event.event_type !== "Task"),
                tasks: action.userData.events.filter(event => event.event_type === "Task"),
                daily_posts: action.userData.daily_posts
            }
        case 'LOGOUT':
           
            console.log("log out from reducer")
            return {
                loggedIn: false,
                userData: {}, 
                moods: JSON.parse(localStorage.getItem('moods')),
                holidays: JSON.parse(localStorage.getItem('holidays')),
                tasks: [],
                daily_posts: [],
                user_events: [],
                weatherInfo: {}
            }
        case 'SIGNUP':
            return {
                ...state,
                loggedIn: true,
                userData: action.user,
                processing_login: false,
                user_events: action.userData.events.filter(event => event.event_type !== "Task"),
                tasks: action.userData.events.filter(event => event.event_type === "Task"),
                daily_posts: action.userData.daily_posts
            }
        case 'STORE_USER_DATA':
            
            return {
                ...state, 
                userData: action.userData
            }
        case 'STORE_MOODS':
            return {
                ...state,
                moods: action.moods
            }
        case 'STORE_HOLIDAYS':
            return {
                ...state,
                holidays: action.holidays
            }
        case 'STORE_DAILY_POSTS':
            return {
                ...state,
                daily_posts: action.posts
            }
        case 'POST_DAILY_POST':
            return {
                ...state,
                daily_posts: [...state['daily_posts'], action.post]
            }
        case 'UPDATE_DAILY_POST':
            let newpostarray = state['daily_posts'].filter(post => post.id !== action.post.id)
            return {
                ...state,
                daily_posts: [...newpostarray, action.post]
            }
        case 'STORE_TASKS':
            return {
                ...state,
                tasks: action.tasks
            }
        case 'POST_EVENT':
            console.log("hello there")
            return {
                ...state,
                user_events: [...state['user_events'], action.userEvent]
            }
            // localStorage.user_events = state['user_events']
        case 'UPDATE_EVENT':
            let newarray = state['user_events'].filter(userEvent => userEvent.id !== action.userEvent.id)
            return {
                ...state,
                user_events: [...newarray, action.userEvent]
            }
        case 'POST_TASK':
            
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
    
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.deletedTask.id)
            }
        case 'TOGGLE_DAILY_POST_BUTTON': 
            return {
                ...state,
                toggle_daily_post: !state.toggle_daily_post
            }
        case 'STORE_EVENTS':
            console.log("bye")
            return {
                ...state,
                user_events: action.events
            }
        case 'DELETE_EVENT':
            return {
                ...state,
                user_events: state.user_events.filter(userEvent => userEvent.id !== action.deletedEvent.id)
            }
        case 'STORE_WEATHER':
            return {
                ...state,
                weatherInfo: {temperature: action.weather.main, desc: action.weather.weather[0]}
            }
        default:
            return state 
    }
}