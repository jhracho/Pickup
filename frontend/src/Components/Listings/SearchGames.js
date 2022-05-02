import axios from 'axios';
import React, {Fragment, useState, useEffect} from 'react';
import GameListing from "./GameListing.js";

const SearchGames = () => {
    const onKeyUp = () => {
        setFilteredGames([]);
        const input = document.getElementById('search-input').value;
        games.forEach(game => {
            if((game.owner.toLowerCase().includes(input.toLowerCase())) || (game.name.toLowerCase().includes(input.toLowerCase())) || (game.date.toLowerCase().includes(input.toLowerCase())) || (game.sport.toLowerCase().includes(input.toLowerCase())) || (String(game.loc).toLowerCase().includes(input.toLowerCase()))){
                setFilteredGames(games => [...games, game])
            }
        });
    };

    const [games, setGames]   = useState([{
        id: 0,
        user: "",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "",
        owner: ""
    }]);

    const [filteredGames, setFilteredGames] = useState([{
        id: 0,
        user: "",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "",
        owner: ""
    }])

    useEffect(() => {
        const athlete_id = localStorage.getItem('athlete_id');

        axios.get('http://52.87.107.120:8802/api/games?user=' + athlete_id).then(res => {
            setGames(res.data['data']);
            setFilteredGames(res.data['data']);
        });
    }, []);

    return(
        <Fragment>
            <input type="text" placeholder="Search by game name, owner, or date" id="search-input" onKeyUp={onKeyUp}/>
            {filteredGames.length === 1 && filteredGames[0].name === "" &&(
                    <img className='loading-icon' src={require("../../Assets/loading.gif")} alt='Loading'/>
            )}
            <div id="search-results-div">
                {filteredGames.length > 0 && filteredGames[0].name !== "" &&(
                    <Fragment>
                    {filteredGames.map((game) => (
                        <GameListing key={game.id} game={game} type='Join'/>
                    ))}
                    </Fragment>
                )}
                {filteredGames.length === 0 && (
                    <Fragment>
                        <h4>No games match the search criteria.</h4>
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
};

export default SearchGames;