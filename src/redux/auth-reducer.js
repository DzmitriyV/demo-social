import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'kamasutra-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'kamasutra-network/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (userId, login, email, isAuth) =>  ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}})

export const getCaptchaUrlSuccess = (captchaUrl) =>  ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

export const getUserData = () => async (dispatch) => {
    let data = await authApi.me()

    if(data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setUserData(id, login, email, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha)

    if(data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        if(data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message= data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let data = await authApi.getCaptcha()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let data = await authApi.logout()

    if(data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export default authReducer