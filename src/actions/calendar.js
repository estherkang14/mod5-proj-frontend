export const toggleDailyPostButton = () => {
    return {
        type: 'TOGGLE_DAILY_POST_BUTTON'
    }
}

export const reRender = () => {
    return {
        type: 'RERENDER'
    }
}


export const postDailyPost = post => {
    return {
        type: 'POST_DAILY_POST',
        post
    }
}

export const postEvent = event => {
    return {
        type: 'POST_EVENT',
        event
    }
}

export const postTask = task => {
    return {
        type: 'POST_TASK',
        task
    }
}

export const deleteTask = deletedTask => {
    return {
        type: 'DELETE_TASK',
        deletedTask
    }
}

export const getWeather = weather => {
    return {
        type: 'GET_WEATHER',
        weather
    }
}