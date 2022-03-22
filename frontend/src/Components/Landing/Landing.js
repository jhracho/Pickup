import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Game from './Game';
import axios from 'axios';

const Landing = () =>{
    const [result, setResult] = useState("");
    const [games, setGames]   = useState([{
        id: 0,
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
        <div id='test'>
            <h1>Hellooo :D</h1>
            <button><Link to='/login'>Login</Link></button>
            <h2>{result}</h2>
            {games.length > 0 && (
                <Fragment>
                {games.map(
                    (game) => (
                        <Game key={game.id} game={game}></Game>
                ))}
                </Fragment>
            )}
        </div>
    );
};

export default Landing;