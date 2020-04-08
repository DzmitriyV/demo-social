import React from 'react'
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {createField, Input} from "../common/FormControls/FormControls";
import {Redirect} from "react-router-dom";
import styles from '../common/FormControls/FormControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {/*<div>*/}
            {/*    <Field name={'email'} component={Input} placeholder={'Email'} validate={[required]}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field name={'password'} component={Input} placeholder={'Password'} type={'password'} validate={[required]}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field name={'rememberMe'} component={Input} type={'checkbox'} /> remember me*/}
            {/*</div>*/}
            {createField('email', Input, 'Email', [required])}
            {createField('password', Input, 'Password', [required], {type: 'password'})}
            {createField('rememberMe', Input, null, [], {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <>
                <img src={captchaUrl} />
                {createField('captcha', Input, 'Symbols from image', [required])}
            </>
            }
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

export default Login