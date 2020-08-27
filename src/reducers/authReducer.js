let user = JSON.parse(localStorage.getItem('user')); 
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: {}};

export default function authReducer (state = initialState, action) {
    
    let newState

    switch(action.type) {
        case 'LOGIN':
            return {
                loggedIn: true,
                user: action.user
            }
        case 'LOGOUT':
            return {
                loggedIn: false,
                user: ''
            }
        default:
            return state 
    }
}