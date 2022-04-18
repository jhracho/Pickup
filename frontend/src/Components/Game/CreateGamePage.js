import React from 'react';
import NavBar from '../Nav/NavBar';
import GameForm from './Form';

const CreateGamePage = () =>{
    return(
        <div id='pageDiv'>
            <NavBar page='' />
            <h1>Create Games Here!</h1>
            <GameForm />
        </div>
    );
};

export default CreateGamePage;