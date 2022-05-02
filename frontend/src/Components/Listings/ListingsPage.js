import React from 'react';
import NavBar from '../Nav/NavBar';
import SearchGames from './SearchGames';
import CreateModal from './CreateModal';

const ListingsPage = () =>{
    return(
        <div>
            <NavBar active="Games"/>
            <div id='pageDiv'>
                <h2 id='page-header'>Games</h2>
                <CreateModal />
                <SearchGames />
            </div>
        </div>
    );
};

export default ListingsPage;