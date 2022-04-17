import React from 'react';
import HomePage from './Home/HomePage.js';
import ListingsPage from './Listings/ListingsPage.js';
import Team from './Teams/Team.js';
import TeamCard from './Teams/TeamCard.js';
import TeamPage from './Teams/TeamPage.js';
import TeamsCardDeck from './Teams/TeamsCardDeck.js';
import Teams from './Teams/Teams.js';
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
                <Route path='/teams' exact component={Teams} />
                <Route path='/team/:id' exact component={TeamPage} /> 
                <Route path='/login' exact component={Login} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Components;