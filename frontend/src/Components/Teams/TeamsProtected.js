import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import Teams from './Teams';

const TeamsProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/teams'
                redirectPath='/login'
                flag={authed}
                component={Teams}
            />
        </div>
    );
}

export default TeamsProtected;