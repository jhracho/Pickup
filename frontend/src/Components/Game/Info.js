import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'

const Info = (props) =>{
    const location = props.game.location;
    const url = "https://google.com/maps?q='"+location+"'";
    const image = "../../../Assets/"+ location +".jpg";
    
    return(
        <div>
            <div className="title">
                <h1 className="title-card">{props.game.name}</h1>
                </div>
                <div className="information-area">
                    <div className="column">
                        <img  className='loc-image' src={require("../../Assets/Ricci Family Fields.jpg")}/>
                        <button><a href={url} target="_blank"><FontAwesomeIcon icon={faMapLocationDot} />Get Directions</a></button>
                    </div>

                    <div className="column">
                        <ul>
                            <li>Sport</li>
                            <li>Date / Time</li>
                            <li>Players</li>
                        </ul>
                    </div>
            </div>

        </div>
    );
};

export default Info;