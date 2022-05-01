import React, { useEffect, useState, Fragment } from "react";

import TeamCard from "./TeamCard.js";

const TeamsCardDeck = ({teams}) => {    
    return (
        <Fragment>
        <div className="card-deck">
            {Object.keys(teams).length > 0 && (
                <Fragment>
                {teams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                ))}
                </Fragment>
            )}
        </div>
        </Fragment>
    );
};

export default TeamsCardDeck;