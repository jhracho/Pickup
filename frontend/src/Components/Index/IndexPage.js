import React, {Fragment} from 'react';
import NavBar from '../Nav/NavBar';
import SitewideStats from './SiteStats';

const IndexPage = () =>{
    return(
        <Fragment>
        <img class="background" src={require('../../Assets/basketball4.jpg')}/>
        <NavBar active='' />
        <div className="title-text">
            <h1>Welcome to Pickup</h1>
        </div>
        <div className="paragraph">
            <p>Pickup is a Notre Dame-based website for students to arrange sporting events and various athletic activities around campus.
                Athletes can create accounts based on their Notre Dame email and immediately jump into the action by joining games at different locations on campus.
                You can also create and join teams to make it easier for you and your friends to play together and meet other groups of students through sports.
                Log in or sign up to get active today!</p>
        </div>
        <div className="button-area">
            <button className="bottom-button learn">Learn More</button>
            <button className="bottom-button create">Get Started</button>
        </div>
            <SitewideStats />

        </Fragment>
    );
};

export default IndexPage;
