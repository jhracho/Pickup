import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import TeamsCardDeck from "./TeamsCardDeck.js";
import AddTeamModal from "./AddTeamModal.js";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
            <h1>Teams</h1>
            <br />
            <AddTeamModal />
            <br />
            <TeamsCardDeck />
        </div>
    );
};

export default Teams;