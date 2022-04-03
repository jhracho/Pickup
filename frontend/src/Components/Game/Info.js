import React from 'react';

const Info = (props) =>{
    return(
        <div>
            <h1>{props.game.id}</h1>
            <h1>{props.game.name}</h1>
            <h1>{props.game.sport}</h1>
            <h1>{props.game.date}</h1>
            <h1>{props.game.time}</h1>
            <h1>{props.game.players}</h1>
            <h1>{props.game.loc}</h1>
        </div>
    );
};

export default Info;