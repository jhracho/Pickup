import React, {Fragment} from 'react';

import TeamImage from "../../Assets/team_img.jpeg";

const TeamHeader = (props) =>{
    return(
        <div
            className="bg-image"
            style={{backgroundImage: `url(${TeamImage})`, height: '300px', textAlign: 'center'}}>
            
            <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-white">
                <h1 className="mb-3">{props.team['name']} {props.team['sport']} Team</h1>
                <h4 className="mb-3">Spots open: {props.team['spots']}</h4>
                <a className="btn btn-outline-light btn-lg" href="#!" role="button">Join</a>
                </div>
            </div>
            </div>
        </div>

    );
};

export default TeamHeader;