import React from 'react';
import { Link } from "react-router-dom";
import Logout from '../Auth/Logout';

const NavBar = (page) =>{
    const pagesLeft = ['Home', 'Games', 'Teams'];
    const curPage = page.active;
  
    return(
        <div id='navBar'>
            <ul>
                {pagesLeft.map((page) => (
                    page===curPage ? 
                    (<li key={page} className='active'>{page}</li>) : 
                    (<li key={page}><Link to={'/'+page.toLowerCase()}>{page}</Link></li>)
                ))}
                <li className="li-right" onClick={Logout}>Logout</li>
                <li className="li-right">My Profile</li>
            </ul>
        </div>
    );
};

export default NavBar;