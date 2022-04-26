import React from 'react';


import NavBar from '../Nav/NavBar';
import ListingsHeader from './Header';
import GamesFilter from './Filter';
import Search from './Search';
import GameTable from './GameTable';
import CreateModal from './CreateModal';

const ListingsPage = () =>{
    return(
        <div id='pageDiv'>
            <NavBar active="Games"/>
            <ListingsHeader />
            <CreateModal />
            <Search />
            
        </div>
    );
};

export default ListingsPage;