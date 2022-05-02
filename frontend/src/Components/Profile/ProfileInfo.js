import React, {Fragment} from "react";

const ProfileInfo = ({first_name, last_name, username}) => {
    const first = first_name;
    const last = last_name;
    const user = username;
    return(
        <div className='profile-info'>
            {first && last && user &&(
                <Fragment>
                <h1 className='profile-header'>My Profile</h1>
                <h2 className='profile-desc'>{first} {last} - {user}</h2>
                </Fragment>
            )}
        </div>
        
    );
};

export default ProfileInfo;