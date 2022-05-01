import React, {useState, useEffect} from 'react';

// // Stateless child component which shows individual event
// // The stateful parent component will be the full CardDeck
const AthleteCard = (athlete) => {
    return (
        <div className="card text-primary text-center shadow-sm bg-white mb-3" style={{maxWidth: '18rem'}}>
            <img className="card-img-top" src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" style={{height: '18rem', width: '18rem'}} alt="Filler team image"></img>
            <div className="team-card-body">
                <h5 className="card-title">{athlete.athlete["first_name"]} {athlete.athlete["last_name"]} ({athlete.athlete["username"]})</h5>
            </div>
            {/* <div className="card-footer text-muted">
                <p className="card-text">This event will be held on {event.get("Date").toLocaleDateString("en-US")}</p>
                <p className="card-text">It is for {event.get("Neighborhood")} community.</p>
            </div> */}
        </div>
    );
};

export default AthleteCard;