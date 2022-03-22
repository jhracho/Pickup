import React from 'react';
import Landing from './Landing/Landing.js';
import Login from './Auth/Login.js';
import GamePage from './Game/GamePage.js';
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/login' exact component={Login} />
                <Route path='/game/:id' exact component={GamePage} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Components;