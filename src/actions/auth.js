export const logIn = user => {
    return {
        type: 'LOGIN',
        user
    }
}

export const signUp = user => {
    return {
        type: 'SIGNUP',
        user
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

export const getWeather = weather => {
    return {
        type: 'GET_WEATHER',
        weather
    }
}