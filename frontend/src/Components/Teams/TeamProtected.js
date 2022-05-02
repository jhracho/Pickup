import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import TeamPage from './TeamPage';

const TeamProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/team/:id'
                redirectPath='/login'
                flag={authed}
                component={TeamPage}
            />
        </div>
    );
}

export default TeamProtected;