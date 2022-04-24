import React, {useState, useEffect, Fragment} from 'react';
import NavBar from '../Nav/NavBar';
import Toggles from './Toggles';
import axios from 'axios';

import ExploreGames from './ExploreGames';
import UpcomingGames from './UpcomingGames';
import YourTeams from './YourTeams';

const HomePage = () =>{
    const [football, setFootball] = useState(-1)
    const [golf, setGolf] = useState(-1)
    const [basketball, setBasketball] = useState(-1)
    const [soccer, setSoccer] = useState(-1)
    const [other, setOther] = useState(-1)
    
    const [games, setGames] = useState([{
        id: 0,
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: ""
    }]);

    const [upcoming, setUpcoming] = useState([{
        id: 0,
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: ""
    }]);

    const onChangeSelect = (e) => {
        var sport = e.target.value;
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/toggle-select',
            data: {
                athlete_id: localStorage.getItem('athlete_id'),
                select: sport
            }
        }).then(res => {
            window.location.reload();
        });
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/get-home-page-info?athlete_id=' + localStorage.athlete_id).then(res => {
            setGames(res.data['games']);
            setUpcoming(res.data['upcoming']);
            setFootball(res.data['selects']['football']);
            setGolf(res.data['selects']['golf']);
            setBasketball(res.data['selects']['basketball']);
            setSoccer(res.data['selects']['soccer']);
            setOther(res.data['selects']['other']);
        }).catch((error) => {
            if(error.response) {
                alert(error.response.status);
            }
        });
    }, []);

    return(
        <div>
            <NavBar active='Home' />
            <div className='home-page-body'>
                <div className='home-cols'>
                    <UpcomingGames upcoming={upcoming} />
                    <YourTeams />
                </div>
                <h4 className='toggle-title'>Preferences:</h4>
                <Toggles football={football} golf={golf} basketball={basketball} soccer={soccer} other={other} onChange={onChangeSelect}/>
                <ExploreGames games={games} />
            </div>
        </div>
    );
};

export default HomePage;