import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import AddTeamModal from "./AddTeamModal.js";
import SearchTeams from "./SearchTeams";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
<<<<<<< HEAD
            <div className='teams-page-body'>
                <h1 className='teams-header'>Teams</h1>
                <TeamsCardDeck />
            </div>
=======
            <h1>Teams</h1>
            <br />
            <AddTeamModal />
            <br />
            <SearchTeams />
>>>>>>> 5531045bb12030da7d2a1134c6fbe5afc48afbff
        </div>
    );
};

export default Teams;