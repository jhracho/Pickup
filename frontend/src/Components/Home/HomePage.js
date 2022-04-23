import React, {useState, useEffect, Fragment} from 'react';
import NavBar from '../Nav/NavBar';
import Toggles from './Toggles';
import axios from 'axios';
import GameListing from '../Listings/GameListing';

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
            <Toggles football={football} golf={golf} basketball={basketball} soccer={soccer} other={other} onChange={onChangeSelect}/>
            <p>the vision for this is to have the teams on the left and upcoming games signed up for on the right, with game suggestions below as like an "explore" feature. make it happen rake</p>
            {upcoming.length > 0 && (
                <Fragment>
                    <h1>My Upcoming Games</h1>
                    {upcoming.map((game) => (
                        <GameListing key={game.id} game={game} />
                    ))}
                </Fragment>
            )}
            {games.length > 0 && (
                <Fragment>
                    <h2>Explore Games</h2>
                    {games.map((game) => (
                        <GameListing key={game.id} game={game} />
                    ))}
                </Fragment>
            )}
            {games.length == 0 && (
                <Fragment>
                    <h1>There are no games.</h1>
                </Fragment>
            )}
        </div>
    );
};

export default HomePage;