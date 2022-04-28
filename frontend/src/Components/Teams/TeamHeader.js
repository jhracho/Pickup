import React, {Fragment} from 'react';

import axios from 'axios';

import TeamImage from "../../Assets/team_img.jpeg";

const TeamHeader = (props) =>{
    
    function joinTeam(e) {
        e.preventDefault();
        const teamId = e.target.id;
        console.log(e.target)
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/joinTeam',
            data: {
              athlete: 16,
              team: teamId
            }
          }).then((res) =>{
              alert('Joined team!')
              window.location.href = '/team/'+teamId;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };
    
    let joinButton;
    joinButton = <a className="btn btn-outline-light btn-lg" role="button" id={props['id']} onClick={joinTeam}>Join</a>

    return(
        <div
            className="bg-image"
            style={{backgroundImage: `url(${TeamImage})`, height: '300px', textAlign: 'center'}}>
            
            <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-white">
                <h1 className="mb-3-name">{props.team['name']} {props.team['sport']} Team</h1>
                <h4 className="mb-3">Spots open: {props.team['spots']}</h4>
                {joinButton}
                </div>
            </div>
            </div>
        </div>

    );
};

export default TeamHeader;