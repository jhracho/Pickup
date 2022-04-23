import React, { useEffect, useState, Fragment } from "react";

import NavBar from '../Nav/NavBar';
import TeamCard from "./TeamCard.js";

import {useParams} from "react-router-dom";
import axios from 'axios';

const TeamsCardDeck = () => {

    const [result, setResult] = useState("");
    const [teams, setTeams]   = useState([{
        id: 0,
        sport: "",
        name: "",
        roster_spots: 0
    }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/teams').then(res =>{
            setResult(res.data['result']);
            setTeams(res.data['data']);
        });
    }, []);

    
    return (
        <Fragment>
        <div className="card-deck">
            {Object.keys(teams).length > 0 && (
                <Fragment>
                {teams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                ))}
                </Fragment>
            )}
        </div>
        </Fragment>
    );
};

export default TeamsCardDeck;