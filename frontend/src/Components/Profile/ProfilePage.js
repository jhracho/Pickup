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
            url: 'http://127.0.0.1:5000/api/toggle-notif',
            data: {
                athlete_id: localStorage.getItem('athlete_id'),
                notif: notif
            }
        }).then(res => {
            window.location.reload();
        });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/get-profile-page-info?athlete_id=' + localStorage.athlete_id).then(res => {
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
            <ProfileInfo first_name={athlete['first_name']} last_name={athlete['last_name']} username={athlete['username']}/>
            <PasswordModal />
            <GameSection games={games} />
            <TeamSection teams={teams} />
            <Preferences game={gameNotif} team={teamNotif} onChange={onChangeSelect} />
        </div>
    );
};

export default ProfilePage;