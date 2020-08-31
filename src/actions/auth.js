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

export const postDailyPost = post => {
    return {
        type: 'POST_DAILY_POST',
        post
    }
}