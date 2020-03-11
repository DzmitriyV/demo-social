import React from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({totalUsersCount, pageSize, currentPage, onPageChange, users, ...props}) => {

    return (
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
            {users.map(u => <User key={u.id}
                                  users={u}
                                  followingInProgress = {props.followingInProgress}
                                  unfollow = {props.unfollow}
                                  follow = {props.follow} />)}
        </div>
    )
}


export default Users