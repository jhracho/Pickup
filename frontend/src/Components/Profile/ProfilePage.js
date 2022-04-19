import axios from 'axios';
import React, {useState, useEffect} from 'react';
import NavBar from '../Nav/NavBar';
import ProfileInfo from './ProfileInfo';
import GameSection from './GameSection';
import TeamSection from './TeamSection';
import ChangePassword from './ChangePassword';

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

    }]);

    const [newPassword, setNewPassword] = useState({
        old_password: '',
        password1: '',
        password2: ''
    });

    const [change, setChange] = useState(false);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const {name, value: newValue} = e.target;

        setNewPassword({
            ...newPassword,
            [name]: newValue
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setChange(true);
    }

    useEffect(() => {
        setChange(false);
        if(newPassword && change) {
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:5000/api/change-password',
                data: {
                    athlete_id: localStorage.getItem('athlete_id'),
                    old_password: newPassword.old_password,
                    password1: newPassword.password1,
                    password2: newPassword.password2
                }
            }).then((res) =>{
                if(res.data['result'] === 'success') {
                    alert("Password successfully changed.");
                    window.location.href = '/profile';
                }
                else{ alert(res.data['msg']); }
                }).catch((error) =>{
                    if (error.response){
                        alert(error.response.status)
                }
            });
        }
    }, [newPassword, change]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/get-profile-page-info?athlete_id=' + localStorage.athlete_id).then(res => {
            setAthlete(res.data['athlete']);
            setGames(res.data['games']);
            setTeams(res.data['teams']);
        });

        var modal = document.getElementById('change-password-modal');
        var btn = document.getElementById('change-password-button');
        var span = document.getElementsByClassName('close')[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if(event.target === modal) {
                modal.style.display = "none";
            }
        }
    }, []);

    return(
        <div>
            <NavBar />
            <ProfileInfo first_name={athlete['first_name']} last_name={athlete['last_name']} username={athlete['username']}/>
            <h5><button id="change-password-button">Change Password</button></h5> {/*see ChangePassword.js for notes about this boy*/}
            <ChangePassword newPassword={newPassword} onChange={onChangeHandler} onSubmit={onSubmitHandler}/>
            <GameSection games={games}/>
            <TeamSection teams={teams}/>
        </div>
    );
};

export default ProfilePage;