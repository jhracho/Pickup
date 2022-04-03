import React from 'react';
import {useParams} from "react-router-dom";

const GamePage = () =>{
    const params = useParams()
    const game_id = params.id;
    return(
        <h1>{game_id}</h1>
    );
};

export default GamePage;