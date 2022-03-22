import React from 'react';
import Home from './Home/Home.js';
import Login from './Auth/Login.js';
import{BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
};

export default Components;