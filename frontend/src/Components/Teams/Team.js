import React, {Fragment, useState, useEffect} from 'react';

import AthleteCard from "./AthleteCard.js";


import {useParams, Link} from "react-router-dom";
import axios from 'axios';

const Team = (props) =>{
    const id = props.team['id'];
    console.log(props);
    const [athletes, setAthletes] = useState([{
        username: "",
        first_name: "",
        last_name: ""
    }]);

    useEffect(() =>{
        if (id !== undefined){
            axios.get('http://127.0.0.1:5000/api/teamRoster/'+id).then(res =>{
                setAthletes(res.data['data']);
            });
        }
    }, [id]);

    console.log(athletes);
    
    return(
        <Fragment>
            <div className="card-deck">
                <h2>Meet the Team</h2>
                <br />
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