import React, {useState, useEffect, Fragment} from 'react';

import Team from './Team';
import TeamHeader from './TeamHeader'
import NavBar from '../Nav/NavBar';

import {useParams} from "react-router-dom";
import axios from 'axios';

const TeamPage = () =>{
    const params = useParams()
    const team_id = params.id;

    const [result, setResult] = useState("");
    const [team, setTeam]   = useState({
        id: 0,
        sport: "",
        name: "",
        roster_spots: 0,
        on_team: 0
    });


    const athlete_id = localStorage.getItem('athlete_id');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/team/'+team_id+'/'+athlete_id).then(res =>{
            setResult(res.data['result']);
            setTeam(res.data['data']);
        });

        // axios.get('http://127.0.0.1:5000/api/team/'+team_id+'/'+athlete_id).then(res =>{
        //     console.log(res);
        //     setResult(res.data['result']);
        //     setStatus(res.data['data']);
        // });
    }, [team_id, athlete_id]);
    console.log(team);



    return(
        <div>
            <NavBar active='' />
            {result==='success' ?
                (
                <Fragment>
                    <TeamHeader team={team}> </TeamHeader>
                    <Team team={team}/>
                </Fragment>
                ) :

                (<div>
                    <h2>Error: Team not found</h2>
                </div>)
            }
        </div>
    );
};

export default TeamPage;