import React from 'react'
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import styles from "../../common/FormControls/FormControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div><b>Full name</b>: {createField('fullName', Input, 'Full name', [])}</div>
            <div><b>Looking for a job</b>: {createField('lookingForAJob', Input, '', [], {type: 'checkbox'})}</div>
            <div><b>My professional skills</b>: {createField('lookingForAJobDescription', Textarea, 'My professional skills', [])}</div>
            <div><b>About me</b>: {createField('aboutMe', Textarea, 'About me', [])}</div>
            <div><b>Contacts</b>:</div>
            {Object.keys(profile.contacts).map(key => {
                return (
                    <div key={key}>
                        <b>{key}</b>:  {createField('contacts.' + key, Input, key, [])}
                    </div>
                )
            })}
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({form: 'profile-data'})(ProfileDataForm)

export default ProfileDataReduxForm