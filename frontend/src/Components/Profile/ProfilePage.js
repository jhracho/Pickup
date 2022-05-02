import axios from 'axios';
import React, {useState, useEffect} from 'react';
import NavBar from '../Nav/NavBar';
import ProfileInfo from './ProfileInfo';
import GameSection from './GameSection';
import TeamSection from './TeamSection';
import PasswordModal from './PasswordModal';
import Preferences from './Preferences';

const ProfilePage = () =>{
    const [athlete, setAthlete] = useState([{
        first_name: "",
        last_name: "",
        username: ""
    }]);
    const [games, setGames] = useState([{
        game_id: -1,
        game_name: "",
        sport: "",
        date: "",
        time: "",
        location: ""
    }]);
    const [teams, setTeams] = useState([{
        id: -1,
        name: "",
        sport: "",
        spots: ""
    }]);
    const [gameNotif, setGameNotif] = useState(-1);
    const [teamNotif, setTeamNotif] = useState(-1);

    const onChangeSelect = (e) => {
        var notif = e.target.value;
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:8802/api/toggle-notif',
            data: {
                athlete_id: localStorage.getItem('athlete_id'),
                notif: notif
            }
        }).then(res => {
            window.location.reload();
        });
    };

    useEffect(() => {
        axios.get('http://52.87.107.120:5000/api/get-profile-page-info?athlete_id=' + localStorage.athlete_id).then(res => {
            setAthlete(res.data['athlete']);
            setGames(res.data['games']);
            setTeams(res.data['teams']);
            setGameNotif(res.data['notifs']['game']);
            setTeamNotif(res.data['notifs']['team']);
        });
    }, []);

    return(
        <div>
            <NavBar />
            {athlete && (
                <ProfileInfo first_name={athlete['first_name']} last_name={athlete['last_name']} username={athlete['username']}/>
            )}
            <PasswordModal />
            {games && (
            <GameSection games={games} />
            )}
            {teams && (
            <TeamSection teams={teams} />
            )}
            {gameNotif && teamNotif &&(
            <Preferences game={gameNotif} team={teamNotif} onChange={onChangeSelect} />
            )}
        </div>
    );
};

export default ProfilePage;