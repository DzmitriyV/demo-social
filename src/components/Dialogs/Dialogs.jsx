import React from 'react'
import s from './Dilogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map( d => <DialogItem key={d.id} name={d.name} id={d.id} /> )
    let messagesElements = state.messages.map( m =>  <Message key={m.id} message={m.message} /> )

    let onSendNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddNewMessageRedux onSubmit={onSendNewMessage} />
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const AddNewMessage = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'} placeholder={`Enter your message`} validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddNewMessageRedux = reduxForm({form: 'dialogAddNewMessageForm'})(AddNewMessage)

export default Dialogs