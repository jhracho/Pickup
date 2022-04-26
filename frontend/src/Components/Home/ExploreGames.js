import React, {Fragment} from 'react';
import GameListing from '../Listings/GameListing';

const ExploreGames = (props) =>{
    var games = props.games;
    
    return(
        <div className='explore-games'>
            {games.length === 1 && (
                <h2>Loading...</h2>
            )}

            {games.length > 1 && (
                <Fragment>
                    <h2>Explore Games</h2>
                    {games.map((game) => (
                        <GameListing key={game.id} game={game} type='Join'/>
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

export default ExploreGames;