import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

    function joinGame(e) {
        e.preventDefault();
        const gameId = e.target.id;
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/joinGame',
            data: {
              user: 10,
              game: gameId
            }
          }).then((res) =>{
              alert('Joined game!')
              window.location.href = '/game/'+gameId;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };

    function leaveGame(e) {
        e.preventDefault();
        const gameId = e.target.id;
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/leaveGame',
            data: {
              user: 10,
              game: gameId
            }
          }).then((res) =>{
              alert('Joined game!')
              window.location.href = '/game/'+gameId;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };

    let listingButton;
    if (game['owner'] === 10)
        listingButton = <Button variant="warning" className = 'game-link-button' id={game['id']}><Link to={'/editGame/'+game['id']}>Edi Game</Link></Button>
    else if (game['attending'] === 1)
        listingButton = <Button variant="danger" className = 'game-link-button' id={game['id']} onClick={leaveGame}>Leave Game</Button>
    else
        listingButton = <Button variant="success" className = 'game-link-button' id={game['id']} onClick={joinGame}>Join Game</Button>

    return(    
        <Card className='game-card'>
            <Card.Header as='h5'>{icon} {game['sport']} - <cite>{game['name']}</cite></Card.Header>
            <Card.Body>
                <div className = 'info-field'>
                    <h5><FontAwesomeIcon icon={faPerson} /> : {game['needed']}</h5> 
                    <h5><FontAwesomeIcon icon={faCalendar} /> : {game['date']} {game['time']}</h5>
                    {listingButton}
                    <Button variant="info" className ="game-link-button" id={game['id']}><a href={'/game/' + game['id']}><h3>More Info</h3></a></Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default GameListing;