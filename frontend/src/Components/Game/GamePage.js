import React from 'react';
import {useParams} from "react-router-dom";

const GamePage = () =>{
    const params = useParams()
    return(
        <h1>{params.id}</h1>
    );
};

export default GamePage;