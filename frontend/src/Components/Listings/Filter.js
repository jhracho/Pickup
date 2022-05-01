import React from 'react';

const GamesFilter = () =>{
    return(
        <div className="game-filter">
            <input type="search" placeholder="Search by Name" className="search-field" /> 
            <select>
                <option value="" selected disabled hidden>Sport</option>
                <option value='Football'>Football</option>
                <option value='Soccer'>Soccer</option>
                <option value='Golf'>Golf</option>
                <option value='Basketball'>Basketball</option>
                <option value='Other'>Other</option>
            </select>
        </div>
    );
};

export default GamesFilter;