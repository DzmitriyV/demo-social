import {profileApi, usersApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
                newPostText: ''
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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostCreator = (newPostText: string): AddPostActionType =>  ({type: ADD_POST, newPostText})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
type deletePosACtionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): deletePosACtionType => ({type: DELETE_POST, postId})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await usersApi.getProfile(userId)

    dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getStatus(userId)

    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileApi.updateStatus(status)

        if(data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {

    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let data = await profileApi.savePhoto(file)

    if(data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {

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
