import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {

    if(!profile) {
        return <Preloader />
    }

    return (
        <div>
            {/*<div><img  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" /></div>*/}
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} />
                <div>Full name</div>
                <div>{profile.fullName}</div>
                <div>Status</div>
                <ProfileStatusWithHooks status={status}  updateStatus={updateStatus} />
                <div>{profile.aboutMe}</div>
                <div>Contacts</div>
                <div>
                    <div><a href={profile.contacts.facebook}>{profile.contacts.facebook}</a></div>
                    <div><a href={profile.contacts.website}>{profile.contacts.website}</a></div>
                    <div><a href={profile.contacts.vk}>{profile.contacts.vk}</a></div>
                    <div><a href={profile.contacts.twitter}>{profile.contacts.twitter}</a></div>
                    <div><a href={profile.contacts.instagram}>{profile.contacts.instagram}</a></div>
                    <div><a href={profile.contacts.youtube}>{profile.contacts.youtube}</a></div>
                    <div><a href={profile.contacts.github}>{profile.contacts.github}</a></div>
                    <div><a href={profile.contacts.mainLink}>{profile.contacts.mainLink}</a></div>
                </div>
                <div>Looking for a job</div>
                <div>{profile.lookingForAJob ? 'Yes' : 'No'}</div>
                <div>{profile.lookingForAJobDescription}</div>
            </div>
        </div>
    )
}

export default ProfileInfo