import React, {useState, useEffect, Fragment} from 'react';
import GameListing from './GameListing';
import axios from 'axios';

const GameTable = () =>{
    const [result, setResult] = useState("");
    const [games, setGames]   = useState([{
        id: 0,
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: ""    
    }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/games').then(res =>{
            setResult(res.data['result']);
            setGames(res.data['data']);
        });
    }, []);

    return(
        <div className = 'table'>
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