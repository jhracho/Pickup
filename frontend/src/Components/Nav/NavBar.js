import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import Logout from '../Auth/Logout';

const NavBar = (page) =>{
    const pages = ['Home', 'Games', 'Teams'];
    const authPages = ['Login', 'Signup'];
    const curPage = page.active;

    if(localStorage.getItem('athlete_id') === null) {
        return(
            <Fragment>
            <img className="background" src={require('../../Assets/basketball4.jpg')}/>
            <div className='navbar'>
                <div className="logo">
                    <img src={require("../../Assets/logo-final.png")} className='logo' alt='Logo' title='Pickup Logo'/>
                </div>
                <div className="logo-text">
                    <h2>Pickup</h2>
                </div>
                <ul className='links'>
                    {authPages.map((page) => (
                        (page===curPage ? 
                        (<a><li key={page} className='active'>{page}</li></a>) : 
                        (<Link to={'/'+page.toLowerCase()} key={page}><li>{page}</li></Link>))
                        )
                    )}                    
                </ul>
            </div>

            <div className="line"></div>
            </Fragment>
        );
    }
  
    return(
        <Fragment>
        <div className='navbar'>
            <div className="logo">
                <img src={require("../../Assets/logo-final.png")} className='logo' alt='Logo' title='Pickup Logo'/>
            </div>
            <div className="logo-text">
                <h2>Pickup</h2>
            </div>
            <ul className='links'>
                {pages.map((page) => (
                    (page===curPage ? 
                    (<a><li key={page} className='active'>{page}</li></a>) : 
                    (<Link to={'/'+page.toLowerCase()} key={page}><li>{page}</li></Link>))
                    )
                )}
                <a><li className="li-right" onClick={Logout}>Logout</li></a>
                {curPage === undefined ?
                    <a><li className="li-right active">Profile</li></a> :
                    <Link to={'/profile'}><li className="li-right">Profile</li></Link>
                }
                
            </ul>
        </div>

        <div className="line"></div>
        </Fragment>
    );
};

export default NavBar;