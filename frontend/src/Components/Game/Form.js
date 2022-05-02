import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const GameForm = (props) =>{
    const handleClose = props.handleClose;

    const [info, setInfo] = useState({
        name: "",
        owner: 0,
        sport: "",
        other: "",
        date: "",
        time: "",
        players: 0,
        loc: "" 
    });

    function handleChange(e){
        e.preventDefault();

        if(document.getElementById('sport-dropdown').value === 'Other' && !document.getElementById('sport-input')) {
            var sportInput = document.createElement('input');
            sportInput.setAttribute('id', 'sport-input');
            sportInput.setAttribute('type', 'text');
            sportInput.setAttribute('name', 'other');
            sportInput.setAttribute('placeholder', 'Sport Name');
            sportInput.setAttribute('maxLength', '25');
            sportInput.addEventListener('change', function(e) {
                e.preventDefault();
                setInfo({
                    ...info,
                    'other': e.target.value
                });
            });
            sportInput.required = 'required';
            document.getElementById('sport-input-div').appendChild(sportInput);
        }
        else if(document.getElementById('sport-dropdown').value !== 'Other' && document.getElementById('sport-input')){
            document.getElementById('sport-input').remove();
        }

        const {name, value: newVal} = e.target;
        setInfo({
            ...info,
            [name]: newVal
        });
    };

    function submitGame(e){
        e.preventDefault();
        console.log(info);
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/addGame',
            data: {
              name: info.name,
              owner: localStorage.getItem('athlete_id'),
              sport: info.sport,
              other: info.other,
              date: info.date,
              time: info.time,
              players: info.players,
              loc: info.loc
            }
          }).then((res) =>{
              alert('Game Created!')
              window.location.href = '/game/'+res.data['id'];
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });

        setInfo({
            name: "",
            sport: "",
            date: "",
            time: "",
            players: 0,
            loc: "" 
        });
    }
    
    // <div className='form-group'><button onClick={submitGame}>Submit</button></div>

    return(
        <div id='form-div'>
            <div className='form-group'>
                <label htmlFor="name-input">Game Name</label>
                <input onChange={handleChange} type='text' text={info.name} name='name'  id='name-input' maxLength='25' required />
            </div>
            <div className='form-group'>
                <label htmlFor="sport-dropdown">Sport</label>
                <select required onChange={handleChange} name='sport' id='sport-dropdown'>
                <option defaultValue="" selected disabled hidden>--</option>
                <option defaultValue='Football'>Football</option>
                <option defaultValue='Soccer'>Soccer</option>
                <option defaultValue='Golf'>Golf</option>
                <option defaultValue='Basketball'>Basketball</option>
                <option defaultValue='Other'>Other</option>
            </select>
            </div>
            <div className='form-group' id='sport-input-div'></div>
            
            <div className='form-group'>
                <label className='form-label' htmlFor="date-input">Date</label>
                <input id='date-input' onChange={handleChange} type='date' text={info.date} name='date' placeholoder='Date' required  />
            </div>
            <div className='form-group'>
                <label htmlFor="time-input">Time</label>
                <input id='time-input' onChange={handleChange} type='time' text={info.time} name='time' placeholoder='Time' required  />
            </div>
            <div className='form-group'>
                <label htmlFor="player-input">Players Needed</label>
                <input id='player-input' onChange={handleChange} type='number' text={info.players} name='players' placeholoder='Players Required' required  />
            </div>
            <div className='form-group'>
                <label htmlFor="location-dropdown">Location</label>
                <select required onChange={handleChange} name='loc' id='location-dropdown'>
                <option defaultValue="" selected disabled hidden>--</option>
                <option defaultValue='0'>The Rock</option>
                <option defaultValue='1'>Ricci Family Fields</option>
                <option defaultValue='2'>Warren Golf Course</option>
            </select>
            </div>
            <Modal.Footer>
            <button className='modal-footer-button' onClick={submitGame}>
                Submit Game
            </button>
            </Modal.Footer>
        </div>
    );
};

export default GameForm;