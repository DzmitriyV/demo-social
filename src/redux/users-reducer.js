import {usersApi} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'kamasutra-network/users/FOLLOW'
const UNFOLLOW = 'kamasutra-network/users/UNFOLLOW'
const SET_USERS = 'kamasutra-network/users/SET_USERS'
const SET_CURRENT_PAGE = 'kamasutra-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'kamasutra-network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'kamasutra-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'kamasutra-network/users/TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) =>  ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching , userId})

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersApi.getUsets(page, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId))


    let data = await apiMethod

    if(data.resultCode === 0) {
        dispatch(actionCreator)
        dispatch(toggleFollowingInProgress(false, userId))
    }
}

export const follow = (userId) => async (dispatch) => {

    followUnfollowFlow(userId, dispatch, usersApi.follow(userId), followSuccess(userId))

}

export const unfollow = (userId) => async (dispatch) => {

    followUnfollowFlow(userId, dispatch, usersApi.unfollow(userId),  unfollowSuccess(userId))

}

export default usersReducer