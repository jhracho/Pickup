import React, { Fragment } from 'react';
import PasswordModal from './PasswordModal';

const Preferences = ({game, team, onChange}) => {
    return(
        <div className='profile-preferences'>
            <PasswordModal />
            {typeof(game) === 'number' && game == 1 && (
                <h5><button id="game-notif-button" name='game' className='password-button btn-on' onClick={onChange}>Game Notifications</button></h5>
            )}
            {typeof(game) === 'number' && game == 0 && (
                <h5><button id="game-notif-button" name='game' className='password-button btn-off' onClick={onChange}>Game Notifications</button></h5>
            )}
            {typeof(team) === 'number' && team == 1 && (
                <h5><button id="team-notif-button" name='team' className='password-button btn-on' onClick={onChange}>Team Notifications</button></h5>
            )}
            {typeof(team) === 'number' && team == 0 && (
                <h5><button id="team-notif-button" name='team' className='password-button btn-off' onClick={onChange}>Team Notifications</button></h5>
            )}
            {/* <input type="checkbox" className='profile-checkbox' id="game-checkbox" name="game-checkbox" value="game" checked={game} onChange={onChange}/>
            <label htmlFor="game-checkbox">Game Notifications</label>
            <input type="checkbox" className='profile-checkbox' id="team-checkbox" name="team-checkbox" value="team" checked={team} onChange={onChange}/>
            <label htmlFor="team-checkbox">Team Notifications</label> */}
        </div>
    );
};

export default Preferences;