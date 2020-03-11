import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="http://html.dev-bitrix.by/manao/img/logo.png" />
            <div  className={s.headerLogin}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to='/login'>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header