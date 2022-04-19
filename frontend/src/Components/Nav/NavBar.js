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
                    (<Link to={'/'+page.toLowerCase()} key={page}><li>{page}</li></Link>)
                ))}
                <li className="li-right" onClick={Logout}>Logout</li>
                {curPage === undefined ?
                    <li className="li-right active">Profile</li> :
                    <Link to={'/profile'}><li className="li-right">Profile</li></Link>
                }
                
            </ul>
        </div>
    );
};

export default NavBar;