import React, {Fragment} from 'react';
import GameListing from '../Listings/GameListing';

const UpcomingGames = (props) =>{
    var upcoming = props.upcoming;
    return(
        <div className='upcoming-games homeCol'>
            <h2>My Upcoming Games</h2>
            {upcoming.length > 0 && (
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