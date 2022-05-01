import axios from 'axios';
import React, {Fragment, useState, useEffect} from 'react';
import TeamsCardDeck from './TeamsCardDeck.js';

const SearchTeams = () => {
    const onKeyUp = () => {
        setFilteredTeams([]);
        const input = document.getElementById('search-input').value;
        teams.forEach(team => {
            if((team.name.toLowerCase().includes(input.toLowerCase())) || (team.sport.toLowerCase().includes(input.toLowerCase()))){
                setFilteredTeams(teams => [...teams, team])
            }
        });
    };

    const [teams, setTeams]   = useState([{
        id: 0,
        name: "",
        sport: "",
        spots: 0
    }]);

    const [filteredTeams, setFilteredTeams] = useState([{
        id: 0,
        name: "",
        sport: "",
        spots: 0
    }])

    useEffect(() => {
        const athlete_id = localStorage.getItem('athlete_id');

        axios.get('http://127.0.0.1:5000/api/teams?athlete=' + athlete_id).then(res => {
            setTeams(res.data['data']);
            setFilteredTeams(res.data['data']);
        });
    }, []);

    return(
        <Fragment>
            <input type="text" placeholder="Search by team name or sport" id="search-input" onKeyUp={onKeyUp}/>
            {filteredTeams.length > 0 && (
                <Fragment>
                    <TeamsCardDeck teams={filteredTeams} />
                </Fragment>
            )}
            {filteredTeams.length === 0 && (
                <Fragment>
                    <h4>No teams match the search criteria.</h4>
                </Fragment>
            )}
        </Fragment>
    )
};

export default SearchTeams;