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
    toggle_daily_post: dailyPost 
    }

} else {
    initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
    moods: JSON.parse(localStorage.getItem('moods')) }
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
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                userAccount: action.user
            }
        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                loggedIn: false,
                userAccount: {},
                userData: {}
            }
        case 'SIGNUP':
            return {
                ...state,
                loggedIn: true,
                userAccount: action.user
            }
        case 'STORE_USER_DATA':
            
            return {
                ...state, 
                userData: action.userData
            }
        case 'GET_WEATHER':
            return {
                ...state,
                weather: action.weather
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
        case 'STORE_TASKS':
            return {
                ...state,
                tasks: action.tasks
            }
        case 'POST_EVENT':
            console.log("hello there")
            return {
                ...state,
                user_events: [...state['user_events'], action.event]
            }
            // localStorage.user_events = state['user_events']
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
        case 'RERENDER':
            return {
                rerender: !state.rerender
            }
        default:
            return state 
    }
}