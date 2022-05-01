import React, {Fragment} from "react";
import TeamCard from "../Home/TeamCard.js";

const TeamSection = ({teams}) => {
    if(teams.length == 0) {
        return(
            <div>
                <h1>Teams</h1>
                <h3>You are not a member of any teams.</h3>
            </div>
        )
    }
    return(
        <div>
            <h1>Teams</h1>
            <Fragment>
                {teams.map((team) => (
                    <TeamCard key={team.team_id} team={team} />
                ))}
            </Fragment>
        </div>
    );
};

export default TeamSection;