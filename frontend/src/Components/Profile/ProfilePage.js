import axios from 'axios';
import React, {useState, useEffect} from 'react';
import NavBar from '../Nav/NavBar';
import ProfileInfo from './ProfileInfo';
import TeamInfo from './TeamInfo';

const ProfilePage = () =>{
    const [athlete, setAthlete] = useState([{
        first_name: "",
        last_name: "",
        username: ""
    }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/get-user-basic-info?athlete_id=' + localStorage.athlete_id).then(res => {
            setAthlete(res.data['athlete']);
            console.log(athlete);
        });
    }, []);

    return(
        <div>
            <NavBar />
            <ProfileInfo first_name={athlete['first_name']} last_name={athlete['last_name']} username={athlete['username']}/>
            <TeamInfo />
        </div>
    );
};

export default ProfilePage;