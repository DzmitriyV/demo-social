import React from 'react'
import styles from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utils/validators/validators"

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControls: React.FC<FormControlsPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error

    return(
        <div className={`${styles.formControl}${hasError ? ' ' + styles.error : ''}`}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = props => {
    const {input, meta, ...restProps} = props
    return(
        <FormControls {...props} >
            <textarea {...input} {...restProps} />
        </FormControls>
    )
}
export const Input: React.FC<WrappedFieldProps> = props => {
    const {input, meta, ...restProps} = props
    return(
        <FormControls {...props} >
            <input {...input} {...restProps} />
        </FormControls>
    )
}

export function createField<KeysType extends string> (
    name: KeysType,
    component: React.FC<WrappedFieldProps>,
    placeholder: string | undefined,
    validators: Array<FieldValidatorType>,
    props= {},
    text= '') {return (
    <div>
        <Field
            name={name}
            component={component}
            placeholder={placeholder}
            validate={validators}
            {...props} />{text}
    </div>
)}