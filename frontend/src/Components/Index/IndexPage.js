import React, {Fragment} from 'react';
import NavBar from '../Nav/NavBar';

const IndexPage = () =>{
    return(
        <Fragment>
        <NavBar active='' />
        <div className="title-text">
            <h1>Welcome to Pickup</h1>
        </div>
        <div className="paragraph">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="button-area">
            <button className="bottom-button learn">Learn More</button>
            <button className="bottom-button create">Get Started</button>
        </div>
        <div className="stats-area">
            <div className="stat" id="users">
                <h1>0</h1>
                <h3>Users</h3>
            </div>
            <div className="stat" id="games">
                <h1>0</h1>
                <h3>Games</h3>
            </div>
            <div className="stat" id="teams">
                <h1>0</h1>
                <h3>Teams</h3>
            </div>
        </div>
        </Fragment>
    );
};

export default IndexPage;