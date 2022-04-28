import React from 'react';


import NavBar from '../Nav/NavBar';
import ListingsHeader from './Header';
import GamesFilter from './Filter';
import Search from './Search';
import GameTable from './GameTable';
import CreateModal from './CreateModal';

const ListingsPage = () =>{
    return(
        <div>
            <NavBar active="Games"/>
            <div id='pageDiv'>
                <h2 id='page-header'>Games</h2>
                <CreateModal />
                <Search />
            </div>
        </div>
    );
};

export default ListingsPage;