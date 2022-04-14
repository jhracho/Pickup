import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import EditForm from './EditForm';
import NavBar from '../Nav/NavBar';

const EditGamePage = () =>{
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
    }, []);

    // game.owner != current id
    

    return(
        <div id='pageDiv'>
            <NavBar page='' />
            <h2>{game_id}</h2>
            <EditForm game={game} />
        </div>
    );
}

export default EditGamePage;