import React, {useState, useEffect} from 'react';

// // Stateless child component which shows individual event
// // The stateful parent component will be the full CardDeck


const AthleteCard = (athlete) => {
    console.log("ATHLETE IN ROSTER:");
    console.log(athlete);
    return (
        <div className="card text-primary text-center shadow-sm bg-white mb-3" style={{maxWidth: '15rem'}}>
            <img className="card-img-top" src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png" style={{height: '15rem', width: '14.9rem'}} alt="Filler profile image"></img>
            <div className="team-card-body">
                <h5 className="card-title">{athlete.athlete["first_name"]} {athlete.athlete["last_name"]}</h5>
                <p className="card-text">{athlete.athlete["username"]}</p>
            </div>
        </div>
    );
};

export default AthleteCard;