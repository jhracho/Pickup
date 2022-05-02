import React, {Fragment, useState, useEffect} from 'react';

import AthleteCard from "./AthleteCard.js";

import {useParams, Link} from "react-router-dom";
import axios from 'axios';

const Team = (props) =>{
    const id = props.team['id'];

    const [result, setResult] = useState("");
    const [athletes, setAthletes] = useState([{
        username: "",
        first_name: "",
        last_name: ""
    }]);

    useEffect(() =>{
        if (id !== undefined){
            axios.get('http://52.87.107.120:5000/api/teamRoster/'+id).then(res =>{
                setResult(res.data['result']);
                setAthletes(res.data['data']);
            });
        }
    }, [id]);
   
    return(
        <Fragment>
            <h2 className='profile-header'>Meet the Team</h2>
            <div className="card-deck">
                {Object.keys(athletes).length > 0 && (
                    <Fragment>
                    {athletes.map((athlete) => (
                        <AthleteCard key={athlete.id} athlete={athlete} />
                    ))}
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

export default Team;