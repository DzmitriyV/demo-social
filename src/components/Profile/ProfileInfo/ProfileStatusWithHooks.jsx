import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && <div><span onDoubleClick={activateEditMode}>{props.status || '-------'}</span></div>}
            {editMode && <div><input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status}/></div>}
        </div>
    )
}

export default ProfileStatusWithHooks