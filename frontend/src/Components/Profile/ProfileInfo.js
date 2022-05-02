import React from "react";

const ProfileInfo = ({first_name, last_name, username}) => {
    return(
        <div className='profile-info'>
            <h1 className='profile-header'>My Profile</h1>
            <h2 className='profile-desc'>{first_name} {last_name} - {username}</h2>
        </div>
    );
};

export default ProfileInfo;