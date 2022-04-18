import React, {Fragment} from "react";
import Team from "./Team";

const TeamSection = ({teams}) => {
    console.log(teams)
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
                    <Team key={team.team_id} team={team} />
                ))}
            </Fragment>
        </div>
    );
};

export default TeamSection;