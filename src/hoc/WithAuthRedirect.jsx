import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if(!props.isAuth) return <Redirect to={'/login'}/>
        return <Component {...props} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}