import React, { Fragment } from 'react';

const Preferences = ({game, team, onChange}) => {
    return(
        <Fragment>
            <h1>Email Preferences</h1>
            <input type="checkbox" id="game-checkbox" name="game-checkbox" value="game" checked={game} onChange={onChange}/>
            <label htmlFor="game-checkbox">Game Notifications</label>
            <input type="checkbox" id="team-checkbox" name="team-checkbox" value="team" checked={team} onChange={onChange}/>
            <label htmlFor="team-checkbox">Team Notifications</label>
        </Fragment>
    );
};

export default Preferences;