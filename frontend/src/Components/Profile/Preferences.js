import React, { Fragment } from 'react';
import PasswordModal from './PasswordModal';

const Preferences = ({game, team, onChange}) => {
    return(
        <div className='profile-preferences'>
            <PasswordModal />
            <input type="checkbox" className='profile-checkbox' id="game-checkbox" name="game-checkbox" value="game" checked={game} onChange={onChange}/>
            <label htmlFor="game-checkbox">Game Notifications</label>
            <input type="checkbox" className='profile-checkbox' id="team-checkbox" name="team-checkbox" value="team" checked={team} onChange={onChange}/>
            <label htmlFor="team-checkbox">Team Notifications</label>
        </div>
    );
};

export default Preferences;