import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFootball, faFutbol, faBasketball, faGolfBallTee, faPerson, faCalendar } from '@fortawesome/free-solid-svg-icons'

const GameListing = (props) =>{
    const game = props.game;

    //console.log(game['id']);

    const type = props.type;
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
            url: 'http://52.87.107.120:5000/api/joinGame',
            data: {
              user: localStorage.getItem('athlete_id'),
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
            url: 'http://52.87.107.120:5000/api/leaveGame',
            data: {
              user: localStorage.getItem('athlete_id'),
              game: gameId
            }
          }).then((res) =>{
              alert('Left game...')
              window.location.href = '/games';
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };

    function joinWaitlist(e){
        e.preventDefault();
        const gameId = e.target.id;
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/joinWaitlist',
            data: {
              user: localStorage.getItem('athlete_id'),
              game: gameId
            }
          }).then((res) =>{
              alert('Joined waitlist!')
              window.location.href = '/game/'+gameId;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    }

    const athlete_id = Number(localStorage.getItem('athlete_id'));
    
    let listingbutton;
    var showOwner = true;
    switch(type){
        case 'Owner':
            listingbutton = <Link to={'/editGame/'+game['id']}><button variant="warning" className = 'game-edit-button' id={game['id']}>Edit Game</button></Link>
            break;

        case 'Upcoming':
            listingbutton = <button className = 'game-link-button leave-button' id={game['id']} onClick={leaveGame}>Leave Game</button>
            break;
        
        case 'Join':
            if (game['players'] === 0)
                listingbutton = <button className = 'game-link-button full-button' id={game['id']} onClick={joinWaitlist}>Join Waitlist</button>
            else
                listingbutton = <button className = 'game-link-button join-button' id={game['id']} onClick={joinGame}>Join Game</button>
            break;

        case 'Profile':
            showOwner = false;
            break;

        default:
            break;
    }
    

    return(    
        <Card className='game-card'>
            <Card.Header as='h5' className='game-header'>{icon} {game['sport']} - <cite>{game['name']}</cite></Card.Header>
            <Card.Body className='game-body'>
                {showOwner &&(
                <div className = 'game-poster'>
                    <h5>Posted by: {game['owner']}</h5>
                </div>
                )}   
                <div className = 'info-field'>
                    <h5><FontAwesomeIcon icon={faPerson} /> : {game['players']}</h5> 
                    <h5><FontAwesomeIcon icon={faCalendar} /> : {game['date']} {game['time']}</h5>
                    {listingbutton}
                    <a href={'/game/' + game['id']}><button className ="game-link-button info-button" id={game['id']}>More Info</button></a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default GameListing;