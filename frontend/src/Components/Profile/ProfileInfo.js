import React from "react";

const ProfileInfo = ({first_name, last_name, username}) => {
    return(
        <div>
            <h1>{first_name} {last_name}</h1>
            <h2>{username}</h2>
        </div>
    );
};

export default ProfileInfo;