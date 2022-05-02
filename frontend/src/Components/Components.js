import React, {Fragment} from 'react';
import IndexPage from './Index/IndexPage.js';
import HomePage from './Home/HomePage.js';
import ListingsPage from './Listings/ListingsPage.js';
import Team from './Teams/Team.js';
import TeamCard from './Teams/TeamCard.js';
import TeamPage from './Teams/TeamPage.js';
import TeamsCardDeck from './Teams/TeamsCardDeck.js';
import Teams from './Teams/Teams.js';
import Login from './Auth/Login/Login.js';
import Signup from './Auth/Signup/Signup.js'
import GamePage from './Game/GamePage.js';
import ProfilePage from './Profile/ProfilePage.js';
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    let authed;
    if (localStorage.getItem('athlete_id') !== null)
        authed = true;
    else
        authed = false;
    
    return(
        <BrowserRouter>
            <Switch>
                {!authed &&(
                    <Fragment>
                        <Route path='/' exact component={IndexPage} />
                        <Route path='/login' exact component={Login} />
                        <Route path='/signup' exact component={Signup} />
                        <Redirect to='/' />
                    </Fragment>
                )}

                {authed &&(
                <Fragment>
                    <Route path='/home' exact component={HomePage} />
                    <Route path='/games' exact component={ListingsPage} />
                    <Route path='/game/:id' exact component={GamePage} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/team/:id' exact component={TeamPage} /> 
                    <Route path='/profile' exact component={ProfilePage} />
                    <Redirect to='/home' />
                </Fragment>
                )}
            </Switch>
        </BrowserRouter>
    );
};

export default Components;