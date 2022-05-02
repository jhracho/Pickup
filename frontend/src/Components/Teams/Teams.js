import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import AddTeamModal from "./AddTeamModal.js";
import SearchTeams from "./SearchTeams";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
            <div  className='teams-page-body'>
                <h1 className='teams-header'>Teams</h1>
                <AddTeamModal />
                <SearchTeams />
            </div>
        </div>
    );
};

export default Teams;