import React, {Fragment} from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFootball, faFutbol, faBasketball, faGolfBallTee, faPerson, faCalendar } from '@fortawesome/free-solid-svg-icons'

const GameListing = (props) =>{
    const sport = props.game['sport'];

    return(    
        <Card className='game-card'>
            <Card.Header as='h5'><FontAwesomeIcon icon={faFootball} /> Football - <cite>Fun 3v3 Game</cite></Card.Header>
            <Card.Body>
                <Card.Text>
                Game Description
                </Card.Text>
                <div className = 'info-field'>
                <h5><FontAwesomeIcon icon={faPerson} /> : 99</h5> 
                <h5><FontAwesomeIcon icon={faCalendar} /> : 12/12/2022 00:00</h5>
                <Button variant="primary"><a href={'/game/' + props.game['id']}><h3>Game Link</h3></a></Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default GameListing;