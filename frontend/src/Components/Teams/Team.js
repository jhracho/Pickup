import React from 'react';

const Team = (props) =>{
    return(
        <div>
            <h1>{props.team.id}</h1>
            <h1>{props.team.sport}</h1>
            <h1>{props.team.name}</h1>
            <h1>{props.team.roster_spots}</h1>
        </div>
    );
};

export default Team;