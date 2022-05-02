import React, {Fragment} from 'react';
import IndexPage from './Index/IndexPage.js';
import HomeProtected from './Home/HomeProtected.js';
import ListingsProtected from './Listings/ListingsProtected.js';
import TeamProtected from './Teams/TeamProtected.js';
import TeamsProtected from './Teams/TeamsProtected.js';
import Login from './Auth/Login/Login.js';
import Signup from './Auth/Signup/Signup.js'
import GameProtected from './Game/GameProtected.js';
import ProfileProtected from './Profile/ProfileProtected.js';
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={IndexPage} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/home' exact component={HomeProtected} />
                <Route path='/games' exact component={ListingsProtected} />
                <Route path='/game/:id' exact component={GameProtected} />
                <Route path='/teams' exact component={TeamsProtected} />
                <Route path='/team/:id' exact component={TeamProtected} /> 
                <Route path='/profile' exact component={ProfileProtected} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Components;