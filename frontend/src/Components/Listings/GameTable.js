import React, {useState, useEffect, Fragment} from 'react';
import GameListing from './GameListing';
import axios from 'axios';

import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const GameTable = () =>{
    const [result, setResult] = useState("");
    const [games, setGames]   = useState([{
        id: 0,
        user: "",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "",
        attending: 0,
        owner: ""   
    }]);

    const user_id = 10;
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/games?user='+user_id).then(res =>{
            setResult(res.data['result']);
            setGames(res.data['data']['game']);
        });
    }, [user_id]);

    return(
        <div className = 'table'>
            <Button variant='info' id='add-game-button'><Link to='/createGame'>Add Game</Link></Button>
            <div className = 'table-body'>
            {games.length > 0 && (
                <Fragment>
                {games.map((game) => (
                    <GameListing key={game.id} game={game}></GameListing>
                ))}
                </Fragment>
            )}  
            </div>
        </div>
    );
};

export default GameTable;