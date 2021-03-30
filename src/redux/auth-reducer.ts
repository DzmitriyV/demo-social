import {authApi, ResultCodeEnum, ResultCodeForCaptcha} from "../api/api"
import {stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const SET_USER_DATA = 'kamasutra-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'kamasutra-network/auth/GET_CAPTCHA_URL_SUCCESS'

// export type InitialStateType = {
//     userId: number | null,
//     login: string | null,
//     email: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null
// }

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetUserDataActionType | GetCaptchaUrlSuccessActionType

type SetUserDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetUserDataActionPayloadType
}

export const setUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetUserDataActionType =>  ({type: SET_USER_DATA, payload: {userId, login, email, isAuth}})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>  ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserData = (): ThunkType => async (dispatch) => {
    let data = await authApi.me()

    if(data.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = data.data
        dispatch(setUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType  => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha)

    if(data.resultCode ===  ResultCodeEnum.Success) {
        dispatch(getUserData())
    } else {
        if(data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message= data.messages.length > 0 ? data.messages[0] : 'Some error'

        // @ts-ignore
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType  => async (dispatch) => {
    let data = await authApi.getCaptcha()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType  => async (dispatch) => {
    let data = await authApi.logout()

    if(data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
}

export default authReducer
