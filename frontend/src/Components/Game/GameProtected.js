import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import GamePage from './GamePage';

const GameProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/game/:id'
                redirectPath='/login'
                flag={authed}
                component={GamePage}
            />
        </div>
    );
}

export default GameProtected;