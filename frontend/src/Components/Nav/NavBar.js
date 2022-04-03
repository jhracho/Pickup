import React from 'react';
import { Link } from "react-router-dom";

const NavBar = (page) =>{
    const pagesLeft = ['Home', 'Games', 'Teams'];
    const curPage = page.page;
  
    return(
        <div id='navBar'>
            <ul>
                {pagesLeft.map((page) => (
                    page===curPage ? 
                    (<li className='active'>{page}</li>) : 
                    (<li><Link to={'/'+page.toLowerCase()}>{page}</Link></li>)
                ))}
                <li className="li-right">Logout</li>
                <li className="li-right">My Profile</li>
            </ul>
        </div>
    );
};

export default NavBar;