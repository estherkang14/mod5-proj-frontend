// let user = JSON.parse(localStorage.getItem('user')); 

// const initialState = user ? { loggedIn: true, userLogin } : { loggedIn: false, user: null, userEventData: {}};

export default function authReducer (state = { loggedIn: false, userData: {}, userAccount: {}}, action) {
    
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
        default:
            return state 
    }
}