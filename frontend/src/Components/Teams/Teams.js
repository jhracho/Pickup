import React, { useEffect, useState, Fragment } from "react";
import NavBar from '../Nav/NavBar';
import AddTeamModal from "./AddTeamModal.js";
import SearchTeams from "./SearchTeams";

const Teams = () =>{
    return(
        <div>
            <NavBar active='Teams' />
            <h1>Teams</h1>
            <br />
            <AddTeamModal />
            <br />
            <SearchTeams />
        </div>
    );
};

export default Teams;