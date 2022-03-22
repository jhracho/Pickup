import React, {Fragment} from 'react';

const Game = (game) =>{
    console.log(game)
    return(
        <Fragment>
            <a href={'/game/' + game.game['id']}><h3>Game Link</h3></a>
        </Fragment>
    );
};

export default Game;