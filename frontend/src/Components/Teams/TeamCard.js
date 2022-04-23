import React, {useState, useEffect} from 'react';

// // Stateless child component which shows individual event
// // The stateful parent component will be the full CardDeck
const TeamCard = (team) => {
    return (
        <div className="card text-primary bg-white mb-3" style={{maxWidth: '18rem'}}>
            <img className="card-img-top" src="https://i2.wp.com/cdn.ndsmcobserver.com/wp-content/uploads/2016/09/19012733/1474248453-547e361c212920a-700x461.jpg?resize=700%2C461" alt="Filler team image"></img>
            <div className="team-card-body">
                <h5 className="card-title">{team.team["name"]}</h5>
                <p className="card-text">{team.team["sport"]}</p>
                <p className="card-text">Spots open: {team.team["spots"]}</p>
                <a href={'/team/' + team.team['id']} className="btn btn-primary stretched-link">Team Page</a>
            </div>
            {/* <div className="card-footer text-muted">
                <p className="card-text">This event will be held on {event.get("Date").toLocaleDateString("en-US")}</p>
                <p className="card-text">It is for {event.get("Neighborhood")} community.</p>
            </div> */}
        </div>
    );
};

export default TeamCard;