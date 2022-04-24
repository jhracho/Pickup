import algoliasearch from "algoliasearch";
import React, { useEffect, useState } from "react";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch/dom';
import GameListing from "./GameListing.js";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Search = () => {
    const [games, setGames]   = useState([{
        id: 0,
        user: "",
        name: "",
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "",
        attending: 0,
        owner: "",
        objectID: ""
    }]);

    const searchClient = algoliasearch(
        'GD3W1OH8LS',
        '0ea9881140b5dd8bafe57a9e45ce823e'
    );

    const Hit = ({ hit }) => {
        return(
        <div className="hit">
            <GameListing game={hit} />
        </div>
        );
    }

    useEffect(() => {
        const athlete_id = localStorage.getItem('athlete_id');
        const client = algoliasearch(
            'GD3W1OH8LS',
            '844ca4d7dcb21d2d03c4438bff81f623'
        );
        const index = client.initIndex('games');

        axios.get('http://127.0.0.1:5000/api/games?user=' + athlete_id).then(res => {
            setGames(res.data['data']);
            var algArray = [];
            games.forEach(game => {
                var algObj = game;
                algObj['objectID'] = game['id'];
                delete algObj.id;
                algArray.push(algObj);
            });
            index.saveObjects(algArray, {autoGenerateObjectIDIfNotExist: false});
        });
    }, []);

    return (
        <div>
            <InstantSearch
                indexName="games"
                searchClient={searchClient}
                >
                <header className="search-header">
                    <SearchBox translations={{placeholder: 'Search by '}}/>
                </header>
                <Button variant='info' id='add-game-button'><Link to='/createGame'>Add Game</Link></Button>
                <Hits hitComponent={Hit}/>
            </InstantSearch>
        </div>
    );
};

export default Search;