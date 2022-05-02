import React, {Fragment} from "react";
import GameListing from "../Listings/GameListing.js";

const GameSection = ({games}) => {
    console.log(games);
    if(games.length === 0) {
        return(
            <div className='game-section'>
                <h1 className='profile-header'>Games</h1>
                <h3 className='profile-desc'>You aren't hosting any upcoming games.</h3>
            </div>
        )
    }
    return(
        <div className='game-section'>
            <h1 className='profile-header'>Games</h1>
            <Fragment>
                {games.map((game) => (
                    <GameListing key={game.game_id} game={game} />
                ))}
            </Fragment>
        </div>
    );
};

export default GameSection;