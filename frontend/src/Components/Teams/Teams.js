import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import TeamsCardDeck from "./TeamsCardDeck.js";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
            <h1>Teams</h1>
            <br />
            <TeamsCardDeck />
        </div>
    );
};

export default Teams;