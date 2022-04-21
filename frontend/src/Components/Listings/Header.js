import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const ListingsHeader = () =>{
    return(
        <div className='listings-header'>
            <h2 id='page-header'>Games</h2>
        </div>
    )
};

export default ListingsHeader;