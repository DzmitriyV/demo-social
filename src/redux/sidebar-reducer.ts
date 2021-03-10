let initialState = {
    friends: [
        {name: 'Andrew'},
        {name: 'Sasha'},
        {name: 'Sveta'},
    ]
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: ActionsType): InitialStateType => {
    let stateCopy = {...state}
    return stateCopy
}

type ActionsType = any

export default sidebarReducer
