import React, {useState, useEffect} from 'react';

import Info from './Info';
import Error from './Error';
import NavBar from '../Nav/NavBar';

import {useParams, Link} from "react-router-dom";
import axios from 'axios';

const GamePage = () =>{
    const params = useParams()
    const game_id = params.id;

    const [result, setResult] = useState("");
    const [game, setGame]   = useState([{
        id: 0,
        owner:"",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        location: ""    
    }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/game/'+game_id).then(res =>{
            setResult(res.data['result']);
            setGame(res.data['data']);
        });
    }, [game_id]);

    // game.owner == current id
    const test = game.owner === 10;
    
    return(
        <div>
            <NavBar active='' />
            {test &&
                <button><Link to={'/editGame/'+game.id}>Edit</Link></button>
            }
            
            {result==='success' ?
                (<Info game={game}/>) :
                (<Error />)
            }
        </div>
    );
};

export default GamePage;