import React, {Fragment} from 'react';

import axios from 'axios';

import TeamImage from "../../Assets/team_img.jpeg";

const TeamHeader = (props) =>{
    function joinTeam(e) {
        e.preventDefault();
        const teamId = e.target.id;
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/joinTeam',
            data: {
              athlete: localStorage.getItem('athlete_id'),
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

    function leaveTeam(e) {
        e.preventDefault();
        const teamId = e.target.id;
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/leaveTeam',
            data: {
              athlete: localStorage.getItem('athlete_id'),
              team: teamId
            }
          }).then((res) =>{
              alert('You left the team.')
              window.location.href = '/team/'+teamId;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };


    
    let headerButton;
    if (props.button === 'Join'){
        headerButton = <a className="btn btn-outline-light btn-lg" role="button" id={props.team['id']} onClick={joinTeam}>Join</a>
    }
    else if (props.button === 'Leave'){
        headerButton = <a className="btn btn-primary" role="button" id={props.team['id']} onClick={leaveTeam}>Leave</a>
 
    }
    

    return(
        <div
            className="bg-image"
            style={{backgroundImage: `url(${TeamImage})`, height: '300px', textAlign: 'center'}}>
            
            <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="d-flex justify-content-center align-items-center">
                <div className="text-white">
                <h1 className="mb-3-name">{props.team['name']} {props.team['sport']} Team</h1>
                <h4 className="mb-3">Spots open: {props.team['roster_spots']}</h4>
                {headerButton}
                </div>
            </div>
            </div>
        </div>

    );
};

export default TeamHeader;