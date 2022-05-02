import React from 'react';
import ProtectedRoute from '../../Common/AppTools/ProtectedRoute';
import { isAuthed } from '../../Common/AppTools/isAuthed';
import ListingsPage from './ListingsPage';

const ListingsProtected = () =>{
    const authed = isAuthed();

    return(
        <div>
            <ProtectedRoute
                exact
                path='/games'
                redirectPath='/login'
                flag={authed}
                component={ListingsPage}
            />
        </div>
    );
}

export default ListingsProtected;