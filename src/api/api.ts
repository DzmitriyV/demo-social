import axios from 'axios'
import {ProfileType, UserType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fc0455f8-b26a-4efe-8416-b2b2c8a38122'
    }
})

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
}

type FollowResponseType = {
    resultCode: string
    messages: Array<string>
    data: {}
}

type UnfollowResponseType = {
    resultCode: string
    messages: Array<string>
    data: {}
}

export const usersApi = {
    getUsets(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getProfile(userId: number | null) {
        console.warn('Obsolete methos. Pelase use profileApi object.')
        return profileApi.getProfile(userId)
    }
}

export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    } ,
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
            .then(response => response.data)
    }
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export const authApi = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<LoginResponseType>(`auth/login`,  {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    },
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data)
    }
}
