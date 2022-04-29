import React, { Fragment } from 'react';
import TeamCard from './TeamCard';

const YourTeams = (props) =>{
    var teams = props.teams;
    
    return(
        <div className='your-teams homeCol'>
            <h2>Your Teams</h2>
            {teams.length === 1 && teams[0].name === '' &&(
                <img className='loading-icon' src={require("../../Assets/loading.gif")} alt='Loading'/>
            )}
            {teams.length === 1 && teams[0].name !== '' &&(
                <Fragment>
                    {teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </Fragment>
            )}
            {teams.length === 0 && (
                <Fragment>
                    <h4>You're not on any teams...</h4>
                </Fragment>
            )}
        </div>
    )
};

export default YourTeams;