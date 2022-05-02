import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import HomePage from './HomePage';

const HomeProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/home'
                redirectPath='/login'
                flag={authed}
                component={HomePage}
            />
        </div>
    );
}

export default HomeProtected;