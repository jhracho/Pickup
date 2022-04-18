import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const ListingsHeader = () =>{
    return(
        <div>
            <h2 id='page-header'>Games</h2>
            <Button variant='info' id='add-game-button'><Link to='/createGame'>Add Game <FontAwesomeIcon icon={faPlus} /></Link></Button>
        </div>
    )
};

export default ListingsHeader;