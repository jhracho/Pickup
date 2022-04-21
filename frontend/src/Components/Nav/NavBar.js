import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import Logout from '../Auth/Logout';

const NavBar = (page) =>{
    const pages = ['Home', 'Games', 'Teams', 'Login', 'Signup'];
    const curPage = page.active;
  
    return(
        <Fragment>
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
                    (<Link to={'/'+page.toLowerCase()} key={page}><li>{page}</li></Link>)
                ))}
                <li className="li-right" onClick={Logout}>Logout</li>
                {curPage === undefined ?
                    <li className="li-right active">Profile</li> :
                    <Link to={'/profile'}><li className="li-right">Profile</li></Link>
                }
                
            </ul>
        </div>

        <div class="line"></div>
        </Fragment>
    );
};

export default NavBar;