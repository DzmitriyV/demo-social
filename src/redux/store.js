import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    message: `Hi, how are you?`,
                    likesCount: 12
                },
                {
                    id: 2,
                    message: `It's my first post`,
                    likesCount: 11
                },
            ],
            newPostText: 'text'
        },
        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Dimych'
                },
                {
                    id: 2,
                    name: 'Andrey'
                },
                {
                    id: 3,
                    name: 'Sveta'
                },
                {
                    id: 4,
                    name: 'Sasha'
                },
                {
                    id: 5,
                    name: 'Victor'
                },
                {
                    id: 6,
                    name: 'Valera'
                },
            ],
            messages: [
                {
                    id: 1,
                    message: 'Hi'
                },
                {
                    id: 2,
                    message: 'How is you it-kamasutra?'
                },
                {
                    id: 3,
                    message: 'Yo'
                },
                {
                    id: 4,
                    message: 'Yo'
                },
                {
                    id: 5,
                    message: 'Yo'
                },
            ],
            newMessageBody: ''
        },
        sidebar: {
            friends: [
                {name: 'Andrew'},
                {name: 'Sasha'},
                {name: 'Sveta'},
            ]
        }
    },
    __callSubscriber () {
        console.log(test);
    },
    getState() {
        return this._state
    },
    subscribe (observer) {
        this.__callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this.__callSubscriber(this._state)
    }
}

export default store