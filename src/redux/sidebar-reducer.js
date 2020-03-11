let initialState = {
    friends: [
        {name: 'Andrew'},
        {name: 'Sasha'},
        {name: 'Sveta'},
    ]
}

const sidebarReducer = (state = initialState, action) => {
    let stateCopy = {...state}
    return stateCopy
}

export default sidebarReducer