import React from 'react';
import HomePage from './Home/HomePage.js';
import ListingsPage from './Listings/ListingsPage.js';
import TeamsPage from './Teams/TeamsPage.js';
import Login from './Auth/Login.js';
import GamePage from './Game/GamePage.js';
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/games' exact component={ListingsPage} />
                <Route path='/game/:id' exact component={GamePage} />
                <Route path='/teams' exact component={TeamsPage} />
                <Route path='/login' exact component={Login} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Components;