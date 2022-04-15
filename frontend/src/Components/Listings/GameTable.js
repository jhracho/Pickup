import React, {useState, useEffect, Fragment} from 'react';
import GameListing from './GameListing';
import axios from 'axios';

const GameTable = () =>{
    const [result, setResult] = useState("");
    const [games, setGames]   = useState([{
        id: 0,
        owner: "",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "",
        attending: 0   
    }]);

    const user_id = 10;
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/games?user='+user_id).then(res =>{
            setResult(res.data['result']);
            setGames(res.data['data']);
        });
    }, [user_id]);

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