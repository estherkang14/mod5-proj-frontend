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

export const updateDailyPost = post => {
    return {
        type: 'UPDATE_DAILY_POST',
        post
    }
}

export const postEvent = userEvent => {
    return {
        type: 'POST_EVENT',
        userEvent
    }
}

export const updateEvent = userEvent => {
    return {
        type: 'UPDATE_EVENT',
        userEvent
    }
}

export const deleteEvent = deletedEvent => {
    return {
        type: 'DELETE_EVENT',
        deletedEvent
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