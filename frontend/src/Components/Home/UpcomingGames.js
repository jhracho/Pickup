import React, {Fragment} from 'react';
import GameListing from '../Listings/GameListing';

const UpcomingGames = (props) =>{
    var upcoming = props.upcoming;
    /*
            {upcoming.length === 1 && (
                <img className='loading-icon' src={require("../../Assets/loading.gif")} alt='Loading'/>
            )}
    */

    return(
        <div className='upcoming-games homeCol'>
            <h2>Your Upcoming Games</h2>
            {upcoming.length === 1 && upcoming[0].name === '' &&(
                <img className='loading-icon' src={require("../../Assets/loading.gif")} alt='Loading'/>
            )}
            {upcoming.length > 0 && upcoming[0].name !== '' &&(
                <Fragment>
                    {upcoming.map((game) => (
                        <GameListing key={game.id} game={game} type='Upcoming'/>
                    ))}
                </Fragment>
            )}
            {upcoming.length === 0 && (
                <Fragment>
                    <h4>You're not signed up for any games...</h4>
                </Fragment>
            )}
        </div>
    )
};

export default UpcomingGames