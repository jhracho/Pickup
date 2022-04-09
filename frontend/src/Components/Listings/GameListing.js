import React, {Fragment} from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFootball, faFutbol, faBasketball, faGolfBallTee, faPerson, faCalendar } from '@fortawesome/free-solid-svg-icons'

const GameListing = (props) =>{
    const game = props.game;
    const sport = game['sport'];
    let icon;
    switch(sport){
        case 'Football':
            icon = <FontAwesomeIcon icon={faFootball} />;
            break;
        case 'Basketball':
            icon = <FontAwesomeIcon icon={faBasketball} />;
            break;
        case 'Soccer':
            icon = <FontAwesomeIcon icon={faFutbol} />;
            break;
        case 'Golf':
            icon = <FontAwesomeIcon icon={faGolfBallTee} />;
            break;
        default:
            icon = <FontAwesomeIcon icon={faGolfBallTee} />;
            break;
    }
    return(    
        <Card className='game-card'>
            <Card.Header as='h5'>{icon} {game['sport']} - <cite>{game['name']}</cite></Card.Header>
            <Card.Body>
                <Card.Text>
                {game['location']}
                </Card.Text>
                <div className = 'info-field'>
                <h5><FontAwesomeIcon icon={faPerson} /> : {game['needed']}</h5> 
                <h5><FontAwesomeIcon icon={faCalendar} /> : {game['date']} 00:00</h5>
                <Button variant="success" className = 'game-link-button'><a href={'/game/' + game['id']}><h3>Join Game</h3></a></Button>
                <Button variant="info" className = 'game-link-button'><a href={'/game/' + game['id']}><h3>More Info</h3></a></Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default GameListing;