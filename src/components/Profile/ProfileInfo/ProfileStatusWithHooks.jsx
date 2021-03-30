import React, {useEffect, useState} from 'react';

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
            <b>Status</b>: {!editMode
                ? <span onDoubleClick={activateEditMode}>{props.status || '-------'}</span>
                : <input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status}/>
            }
        </div>
    )
}

export default ProfileStatusWithHooks