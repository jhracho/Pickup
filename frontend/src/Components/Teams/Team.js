import React, {Fragment, useState, useEffect} from 'react';

import {useParams, Link} from "react-router-dom";
import axios from 'axios';

const Team = (props) =>{
    const id = props.team['id'];
    const [athletes, setAthletes] = useState([""]);

    useEffect(() =>{
        if (id !== undefined){
            axios.get('http://127.0.0.1:5000/api/teamRoster/'+id).then(res =>{
                setAthletes(res.data['data']);
            });
        }
    }, [id]);

    
    return(
        <Fragment>
            <div className="roster">
                <h2>Team Roster</h2> 
                <ul>
                    {athletes.map((athlete, index) =>(
                        <li key={index}>{athlete}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
};

export default Team;