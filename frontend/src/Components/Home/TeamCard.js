import React, {Fragment} from 'react';

const TeamCard = (props) => {
    var team = props.team;
    return(
        <Fragment>
            <p>{team.name}, {team.sport} with {team.spots} spots left</p>
        </Fragment>
    );
};

export default TeamCard;