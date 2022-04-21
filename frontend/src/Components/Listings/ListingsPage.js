import React from 'react';


import NavBar from '../Nav/NavBar';
import ListingsHeader from './Header';
import GamesFilter from './Filter';
import GameTable from './GameTable';

const ListingsPage = () =>{
    return(
        <div id='pageDiv'>
            <NavBar active="Games"/>
            <ListingsHeader />
            <GamesFilter />
            <GameTable />
        </div>
    );
};

export default ListingsPage;