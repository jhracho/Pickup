import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

const TeamForm = (props) =>{
    const handleClose = props.handleClose;

    const [info, setInfo] = useState({
        sport: "",
        team_name: "",
        roster_spots: 0
    });

    function handleChange(e){
        e.preventDefault();
        const {name, value: newVal} = e.target;
        if (name === 'sport'){
            console.log('Sport Change!');
        }
        setInfo({
            ...info,
            [name]: newVal
        });
    };

    function submitTeam(e){
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/addTeam',
            data: {
              sport: info.sport,
              name: info.name,
              roster_spots: info.roster_spots,
              creator: localStorage.getItem('athlete_id')
            }
          }).then((res) =>{
              alert('Team Created!')
              window.location.href = '/team/'+res.data['id'];
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });

        setInfo({
            sport: "",
            name: "",
            roster_spots: 0
        });
    }

    return(
        <div id='form-div'>
            <div className='form-group'>
                <label htmlFor="team-name-input">Team Name</label>
                <input onChange={handleChange} type='text' text={info.name} name='name' id='team-name-input' placeholoder='Team Name' maxLength='25' required />
            </div>
            <div className='form-group'>
                <label htmlFor="team-sport-input">Primary Sport</label>
                <select required onChange={handleChange} name='sport' id='team-sport-input'>
                <option defaultValue="" selected disabled hidden>Sport</option>
                <option defaultValue='Football'>Football</option>
                <option defaultValue='Soccer'>Soccer</option>
                <option defaultValue='Golf'>Golf</option>
                <option defaultValue='Basketball'>Basketball</option>
                <option defaultValue='Other'>Other</option>
            </select>
            </div>
            <div className='form-group'>
                <label htmlFor="team-roster-input">Roster Spots</label>
                <input onChange={handleChange} type='number' text={info.roster_spots} id='team-roster-input' name='roster_spots' placeholoder='Roster Spots Available' required  />
            </div>
            <Modal.Footer>
            <button className='modal-footer-button' onClick={submitTeam}>
                Create Team
            </button>
            </Modal.Footer>
        </div>
    );
};

export default TeamForm;