import React, {useState, useEffect} from 'react';

import Team from './Team';
import NavBar from '../Nav/NavBar';

import {useParams} from "react-router-dom";
import axios from 'axios';

const TeamPage = () =>{
    const params = useParams()
    const team_id = params.id;

    const [result, setResult] = useState("");
    const [team, setTeam]   = useState([{
        id: 0,
        sport: "",
        name: "",
        roster_spots: 0
    }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/team/'+team_id).then(res =>{
            setResult(res.data['result']);
            setTeam(res.data['data']);
        });
    }, []);

    return(
        <div>
            <NavBar active='' />
            {result==='success' ?
                (<Team team={team}/>) :
                (<div>
                    <h2>Error: Game not found</h2>
                </div>)
            }
        </div>
    );
};

export default TeamPage;