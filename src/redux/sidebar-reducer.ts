let initialState = {
    friends: [
        {name: 'Andrew'},
        {name: 'Sasha'},
        {name: 'Sveta'},
    ]
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    let stateCopy = {...state}
    return stateCopy
}

export default sidebarReducer
