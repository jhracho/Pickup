import React, {Fragment} from 'react';

import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const GameListing = (props) =>{
    const sport = props.game['sport'];

    let icon;
    switch (sport){
        case 'Football':
            icon = <SportsFootballIcon />
            break;
        case 'Soccer':
            icon = <SportsSoccerIcon />
            break;
        case 'Basketball':
            icon = <SportsBasketballIcon />
            break;
        case 'Golf':
            icon = <SportsGolfIcon />
            break;                        
    }

    return(
        <Fragment>
            <a href={'/game/' + props.game['id']}><h3>Game Link</h3></a>
        </Fragment>
    );
};

export default GameListing;