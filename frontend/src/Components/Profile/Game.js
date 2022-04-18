import React from "react";

const Game = ({game}) => {
    return(
        <div>
            <h2>{game.game_id}, {game.game_name}</h2>
            <h3>{game.sport} at {game.location}</h3>
            <h4>{game.date} {game.time}</h4>
        </div>
    );
};

export default Game;