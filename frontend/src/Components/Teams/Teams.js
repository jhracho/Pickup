import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import TeamsCardDeck from "./TeamsCardDeck.js";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
            <div className='teams-page-body'>
                <h1 className='teams-header'>Teams</h1>
                <TeamsCardDeck />
            </div>
        </div>
    );
};

export default Teams;