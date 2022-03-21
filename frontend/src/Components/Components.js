import React from 'react';
import Home from './Home/Home.js';
import Login from './Auth/Login.js';
import{BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

const Components = () =>{
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default Components;