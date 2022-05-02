import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import ProfilePage from './ProfilePage';

const ProfileProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/profile'
                redirectPath='/login'
                flag={authed}
                component={ProfilePage}
            />
        </div>
    );
}

export default ProfileProtected;