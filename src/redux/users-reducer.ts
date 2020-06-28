import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {PhotosType, UserType} from "../types/types";

const FOLLOW = 'kamasutra-network/users/FOLLOW'
const UNFOLLOW = 'kamasutra-network/users/UNFOLLOW'
const SET_USERS = 'kamasutra-network/users/SET_USERS'
const SET_CURRENT_PAGE = 'kamasutra-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'kamasutra-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'kamasutra-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'kamasutra-network/users/TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users ids
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                // users: state.users.map(u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter( id => id !== action.userId)

            }
        default:
            return state
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId:number): FollowSuccessActionType =>  ({type: FOLLOW, userId})
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId:number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType  => ({type: SET_USERS, users})
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching , userId})

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersApi.getUsets(page, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (userId: number, dispatch: any, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, userId))


    let data = await apiMethod

    if(data.resultCode === 0) {
        dispatch(actionCreator)
        dispatch(toggleFollowingInProgress(false, userId))
    }
}

export const follow = (userId: number) => async (dispatch: any) => {

    followUnfollowFlow(userId, dispatch, usersApi.follow(userId), followSuccess(userId))

}

export const unfollow = (userId: number) => async (dispatch: any) => {

    followUnfollowFlow(userId, dispatch, usersApi.unfollow(userId),  unfollowSuccess(userId))

}

export default usersReducer
