import React from 'react'
import styles from './FormControls.module.css'
import {Field} from "redux-form";

const FormControls = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return(
        <div className={`${styles.formControl}${hasError ? ' ' + styles.error : ''}`}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props
    return(
        <FormControls {...props} >
            <textarea {...input} {...restProps} />
        </FormControls>
    )
}
export const Input = (props) => {
    const {input, meta, ...restProps} = props
    return(
        <FormControls {...props} >
            <input {...input} {...restProps} />
        </FormControls>
    )
}

export const createField = (name, component, placeholder = '', validators,  props= {}, text= '') => (
    <div>
        <Field
            name={name}
            component={component}
            placeholder={placeholder}
            validate={validators}
            {...props} />{text}
    </div>
)