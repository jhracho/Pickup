import React, {Fragment} from 'react';

import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFootball, faFutbol, faBasketball, faGolfBallTee, faPerson, faCalendar } from '@fortawesome/free-solid-svg-icons'

const TeamCard = (props) => {
    var team = props.team;
    
    const sport = team['sport'];

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
            <Card.Header as ='h5' className='game-header'>{icon} {team["name"]} {team['sport']} Team </Card.Header>
            <Card.Body className='game-body'>
                <div className = 'info-field'>
                    <a href={'/team/' + team['id']}><button className ="game-link-button team-info-button" id={team['id']}>View Team Page</button></a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TeamCard;