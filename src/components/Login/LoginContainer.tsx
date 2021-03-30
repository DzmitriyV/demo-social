import React from 'react'
import Login from './Login'
import {connect} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {AppStateType} from "../../redux/redux-store"


class LoginContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    render() {
        return (
            <Login {...this.props} />
        )
    }

}

export type MapStatePropsType = {
    captchaUrl : string | null
    isAuth: boolean
}

export type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, {login})(LoginContainer)