import React, {FC} from 'react'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChange, users, ...props}) => {

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
