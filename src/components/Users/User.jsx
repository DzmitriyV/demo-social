import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";

let User = ({users, followingInProgress, unfollow, follow}) => {
    return (
        <div key={users.id}>
            <span>
                <div>
                    <NavLink to={`profile/${users.id}`}>
                    <img src={users.photos.small != null ? users.photos.small : userPhoto}
                         className={styles.userPhoto} alt=""/>
                     </NavLink>
                </div>
                <div>
                    {users.followed
                        ? <button disabled={followingInProgress.some( id => id === users.id)} onClick={() => {
                            unfollow(users.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some( id => id === users.id)} onClick={() => {
                            follow(users.id)
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{users.name}</div>
                    <div>{users.status}</div>
                </span>
                <span>
                    <div>{/*users.location.country*/}</div>
                    <div>{/*users.location.city*/}</div>
                </span>
            </span>
        </div>
    )
}


export default User