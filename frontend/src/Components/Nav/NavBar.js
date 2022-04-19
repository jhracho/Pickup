import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import Logout from '../Auth/Logout';

const NavBar = (page) =>{
    const pages = ['Home', 'Games', 'Teams', 'Login', 'Signup'];
    const curPage = page.active;
  
    return(
        <Fragment>
        <img class="background" src={require('../../Assets/basketball4.jpg')}/>
        <div class='navbar'>
            <div class="logo">
                <img src={require("../../Assets/logo-final.png")} class='logo' alt='Logo' title='Pickup Logo'/>
            </div>
            <div class="logo-text">
                <h2>Pickup</h2>
            </div>
            <ul class='links'>
                {pages.map((page) => (
                    page===curPage ? 
                    (<li key={page} className='active'>{page}</li>) : 
                    (<li><Link to={'/'+page.toLowerCase()} key={page}>{page}</Link></li>)
                ))}
            </ul>
        </div>

        <div class="line"></div>
        </Fragment>
    );
};

export default NavBar;