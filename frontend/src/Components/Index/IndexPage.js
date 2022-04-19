import React, {Fragment} from 'react';
import NavBar from '../Nav/NavBar';

const IndexPage = () =>{
    return(
        <Fragment>
        <NavBar active='' />
        <div class="title-text">
            <h1>Welcome to Pickup</h1>
        </div>
        <div class="paragraph">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="button-area">
            <button class="bottom-button learn">Learn More</button>
            <button class="bottom-button create">Get Started</button>
        </div>
        <div class="stats-area">
            <div class="stat" id="users">
                <h1>0</h1>
                <h3>Users</h3>
            </div>
            <div class="stat" id="games">
                <h1>0</h1>
                <h3>Games</h3>
            </div>
            <div class="stat" id="teams">
                <h1>0</h1>
                <h3>Teams</h3>
            </div>
        </div>
        </Fragment>
    );
};

export default IndexPage;