import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import GameListing from './GameListing';
import axios from 'axios';
import NavBar from '../Nav/NavBar';



const ListingsPage = () =>{
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
    
    /*
     <div id='test'>
                <Typography variant='h3'>Tinder For Sports</Typography>
                <h1>Hellooo :D</h1>
                <button><Link to='/login'>Login</Link></button>
                <h2>{result}</h2>
                {games.length > 0 && (
                    <Fragment>
                    {games.map((game) => (
                        <GameListing key={game.id} game={game}></GameListing>
                    ))}
                    </Fragment>
                )}
    </div>
    */

    return(
        <div id='pageDiv'>
            <NavBar active="Games"/>
            <h2>Games</h2>
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
           
        </div>
    );
};

export default ListingsPage;