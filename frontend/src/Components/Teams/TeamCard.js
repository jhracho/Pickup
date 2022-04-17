import React, {useState, useEffect} from 'react';

// // Stateless child component which shows individual event
// // The stateful parent component will be the full CardDeck
const TeamCard = ({ team }) => {
    return (
        <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
            <div className="card-header">{team.get("team_name")}</div>
            <div className="card-body">
                <img class="card-img-top" src="https://i2.wp.com/cdn.ndsmcobserver.com/wp-content/uploads/2016/09/19012733/1474248453-547e361c212920a-700x461.jpg?resize=700%2C461" alt="Filler team image"></img>
                <p className="card-text">{team.get("sport")}</p>
                <p className="card-text">{team.get("roster_spots")}</p>
                <a href="#" class="btn btn-primary stretched-link">Team Page</a>
            </div>
            {/* <div className="card-footer text-muted">
                <p className="card-text">This event will be held on {event.get("Date").toLocaleDateString("en-US")}</p>
                <p className="card-text">It is for {event.get("Neighborhood")} community.</p>
            </div> */}
        </div>
    );
};

export default TeamCard;