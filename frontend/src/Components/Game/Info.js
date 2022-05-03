import React, { useState, useEffect, cloneElement } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

import CurrentRoster from './CurrentRoster';
import OwnerButtons from './OwnerButtons';

const Info = (props) =>{
    const location = props.game.location;
    
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
            axios.get('http://52.87.107.120:5000/api/location/'+location).then(res =>{
                setLoc(res.data['data']);
            });
        }
    }, [location]);
    
    const url = "https://google.com/maps?q='"+loc.name+"'";

    const photo1 = <img className='loc-image' src={require("../../Assets/Ricci Family Fields.jpg")}/>;
    const photo2 = <img className='loc-image' src={require("../../Assets/The Rock.jpg")}/>;
    const photo3 = <img className='loc-image' src={require("../../Assets/Warren Golf Course.jpg")}/>

    let photo;
    switch (location){
        case 0:
            photo = photo2;
            break;
        case 1:
            photo = photo1;
            break;
        case 2:
            photo = photo3;
            break;
        default:
            photo = photo1;
            break;
    }
    return(
        <div>
            <div className="title">
                <h1 className="title-card">{props.game.name}: Details</h1>
            </div>
            <div className='owner-buttons-area'>
                <OwnerButtons game={props.game}/>
            </div>
            
            <div className="information-area">
                <div className="column">
                    <h2 className="location-title">Location</h2>
                    {photo}
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