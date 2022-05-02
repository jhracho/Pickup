import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SitewideStats = () =>{
    const [stats, setStats] = useState({
        "users":0,
        "games":0,
        "teams":0
    });

    useEffect(() => {
        axios.get('http://52.87.107.120:5000/api/landingStats').then(res =>{
            setStats(res.data['data']);
        });
    }, []);

    return(
        <div class="stats-area">
            <div class="stat" id="users">
                <h1>{stats['athlete']}</h1>
                <h3>Users</h3>
            </div>
            <div class="stat" id="games">
                <h1>{stats['game']}</h1>
                <h3>Games</h3>
            </div>
            <div class="stat" id="teams">
                <h1>{stats['teams']}</h1>
                <h3>Teams</h3>
            </div>
        </div>
    );
};

export default SitewideStats;