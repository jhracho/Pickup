import React from 'react';


import NavBar from '../Nav/NavBar';
import ListingsHeader from './Header';
import GameTable from './GameTable';

const ListingsPage = () =>{
    return(
        <div id='pageDiv'>
            <NavBar active="Games"/>
            <ListingsHeader />
            <GameTable />
        </div>
    );
};

export default ListingsPage;