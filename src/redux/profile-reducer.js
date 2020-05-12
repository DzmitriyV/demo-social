import {profileApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'kamasutra-network/profile/ADD-POST'
const SET_USER_PROFILE = 'kamasutra-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'kamasutra-network/profile/SET_STATUS'
const DELETE_POST = 'kamasutra-network/profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'kamasutra-network/profile/SAVE_PHOTO_SUCCESS'

let initialState = {
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
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}

export const addPostCreator = (newPostText) =>  ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await usersApi.getProfile(userId)

    dispatch(setUserProfile(data))
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileApi.getStatus(userId)

    dispatch(setStatus(data))
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        let data = await profileApi.updateStatus(status)

        if(data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {

    }
}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileApi.savePhoto(file)

    if(data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {

    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)

    if(data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let message= data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('profile-data', {_error: message}))
        return Promise.reject(message)
    }
}

export default profileReducer