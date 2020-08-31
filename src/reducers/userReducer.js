// let user = JSON.parse(localStorage.getItem('user')); 

const initialState = { loggedIn: localStorage.getItem('loggedIn'), userData: JSON.parse(localStorage.getItem('userData')),
moods: JSON.parse(localStorage.getItem('moods')), holidays: JSON.parse(localStorage.getItem('holidays')) }

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
        default:
            return state 
    }
}