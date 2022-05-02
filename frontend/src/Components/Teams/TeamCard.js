import React, {useState, useEffect} from 'react';

// Import the image options
import FootballImage1 from "../../Assets/flag_football_1.jpg";
import FootballImage2 from "../../Assets/flag_football_2.jpg";
import FootballImage3 from "../../Assets/flag_football_3.jpg";
import GolfImage1 from "../../Assets/golf_image_1.jpg";
import GolfImage2 from "../../Assets/golf_image_2.jpeg";
import GolfImage3 from "../../Assets/golf_image_3.jpeg";
import BasketballImage1 from "../../Assets/basketball_1.jpeg";
import BasketballImage2 from "../../Assets/basketball_2.jpg";
import BasketballImage3 from "../../Assets/basketball_3.jpeg";
import SoccerImage1 from "../../Assets/soccer_1.jpeg";
import SoccerImage2 from "../../Assets/soccer_2.jpeg";
import SoccerImage3 from "../../Assets/soccer_3.jpeg";
import GenericImage from "../../Assets/generic.jpeg"; 


const TeamCard = (team) => {
    const sport = team.team["sport"];
    let SportImage;

    var footballImages = [FootballImage1, FootballImage2, FootballImage3];
    var golfImages = [GolfImage1, GolfImage2, GolfImage3];
    var basketballImages = [BasketballImage1, BasketballImage2, BasketballImage3];
    var soccerImages = [SoccerImage1, SoccerImage2, SoccerImage3];

    var index;

    switch(sport){
        case 'Football':
            index = Math.floor(Math.random() * footballImages.length);
            SportImage = footballImages[index];
            break;
        case 'Basketball':
            index = Math.floor(Math.random() * basketballImages.length);
            SportImage = basketballImages[index];
            break;
        case 'Soccer':
            index = Math.floor(Math.random() * soccerImages.length);
            SportImage = soccerImages[index];
            break;
        case 'Golf':
            index = Math.floor(Math.random() * golfImages.length);
            SportImage = golfImages[index];
            break;
        default:
            SportImage = GenericImage;
            break;
    }

    return (
        <div className="card text-primary text-center shadow-sm mb-3" style={{maxWidth: '18rem'}}>
            <img className="card-img-top" src={SportImage} style={{maxWidth: '18rem'}} alt="Filler team image"></img>
            <div className="team-card-body">
                <h5 className="card-title">{team.team["name"]}</h5>
                <p className="card-text">{team.team["sport"]}</p>
                <p className="card-text">Spots open: {team.team["spots"]}</p>
                <a href={'/team/' + team.team['id']} className="btn btn-primary stretched-link">Team Page</a>
            </div>
        </div>
    );
};

export default TeamCard;