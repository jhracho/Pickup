import React, { useState, useEffect, cloneElement } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

import CurrentRoster from './CurrentRoster';
import OwnerButtons from './OwnerButtons';

const Info = (props) =>{
    const location = props.game.location;
    const url = "https://google.com/maps?q='"+location+"'";
    const image = "../../../Assets/"+ location +".jpg";
    
    const [loc, setLoc] = useState({
        id: 0,
        name: "",
        addy: "",
        sports: "",
        openHour: "",
        closeHour: ""  
    });

    useEffect(() =>{
        if (location !== undefined){
            axios.get('http://127.0.0.1:5000/api/location/'+location).then(res =>{
                setLoc(res.data['data']);
            });
        }
    }, [location]);

    var currentUser = Number(localStorage.getItem('athlete_id'));
    
    return(
        <div>
            <div className="title">
                <h1 className="title-card">{props.game.name}: Details</h1>
            </div>
            {currentUser === props.game.owner &&(
            <div className='owner-buttons-area'>
                <OwnerButtons game={props.game}/>
            </div>
            )}
            <div className="information-area">
                <div className="column">
                    <h2 className="location-title">Location</h2>
                    <img  className='loc-image' src={require("../../Assets/Ricci Family Fields.jpg")}/>
                    <ul>
                        <li>{loc.name}</li>
                        <li>Hours: {loc.openHour} - {loc.closeHour}</li>
                    </ul>
                    <a href={url} target="_blank"><button className='directions-button'><FontAwesomeIcon icon={faMapLocationDot} />  Get Directions</button></a>
                </div>

                <div className="column">
                    <h2 className="details-title">Details</h2>
                    <ul className='info-list'>
                        <li>Sport: {props.game.sport}</li>
                        <li>Date: {props.game.date}</li>
                        <li>Time: {props.game.time}</li>
                        <li>Players Needed: {props.game.needed}</li>
                    </ul>
                    <h2 className='roster-title'>Currently Attending</h2>
                    <CurrentRoster id={props.game.id}/>
                </div>
            </div>
        </div>
    );
};

export default Info;