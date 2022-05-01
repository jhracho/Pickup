import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const EditForm = (props) =>{
    const [info, setInfo] = useState({
        name: props.game.name,
        sport: props.game.sport,
        date: props.game.date,
        time: props.game.time,
        players: props.game.players,
        loc: props.game.location 
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

    function editGame(e){
        e.preventDefault();
        console.log(info.loc);
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/editGame',
            data: {
              id: props.game.id,
              name: info.name,
              sport: info.sport,
              date: info.date,
              time: info.time,
              players: info.players,
              loc: info.loc
            }
          }).then((res) =>{
            window.location.href = '/game/'+res.data['id'];
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };

    // props.game.date.substring(6, 10) + '-' + props.game.date.substring(0,2) + '-' + props.game.date.substring(3, 5)
    // defaultValue={props.game.time.substring(0,5)+props.game.time.substring(8,9)} 

    return(
        <div id='form-div'>
            <div className='form-group'>
                <input onChange={handleChange} type='text' text={info.name} name='name' placeholoder='Game Name' defaultValue={props.game.name} maxLength='25' required />
            </div>
            <div className='form-group'>
            <select required onChange={handleChange} name='sport'>
                {props.game.sport === 'Football' ?
                    <option value='Football' selected='selected'>Football</option> :
                    <option value='Football'>Football</option>
                }
                {props.game.sport === 'Soccer' ?
                    <option value='Soccer' selected='selected'>Soccer</option> :
                    <option value='Soccer'>Soccer</option>
                }
                {props.game.sport === 'Basketball' ?
                    <option value='Basketball' selected='selected'>Basketball</option> :
                    <option value='Basketball'>Basketball</option>
                }
                {props.game.sport === 'Golf' ?
                    <option value='Golf' selected='selected'>Golf</option> :
                    <option value='Golf'>Golf</option>
                }
            </select>
            </div>
            <div className='form-group'>
                {props.game.date &&
                <input onChange={handleChange} type='date' text={info.date} name='date' placeholoder='Date' defaultValue={props.game.date.substring(6, 10) + '-' + props.game.date.substring(0,2) + '-' + props.game.date.substring(3, 5)} required />
                }
            </div>
            <div className='form-group'>
                {props.game.time &&
                <input onChange={handleChange} type='time' text={info.time} name='time' placeholoder='Time' defaultValue={props.game.time.substring(0,5)+props.game.time.substring(8,9)} required  />    
                }
            </div>
            <div className='form-group'>
                <input onChange={handleChange} type='number' text={info.players} name='players' placeholoder='Players Required' required  />
            </div>
            <div className='form-group'>
                <select required onChange={handleChange} name='loc'>
                    {props.game.sport === 'The Rock' ?
                        <option value='The Rock' selected='selected'>The Rock</option> :
                        <option value='The Rock'>The Rock</option>
                    }
                    {props.game.sport === 'Ricci Family Fields' ?
                        <option value='Ricci Family Fields' selected='selected'>Ricci Family Fields</option> :
                        <option value='Ricci Family Fields'>Ricci Family Fields</option>
                    }
                    {props.game.sport === 'Warren Golf Course' ?
                        <option value='Warren Golf Course' selected='selected'>Warren Golf Course</option> :
                        <option value='Warren Golf Course'>Warren Golf Course</option>
                    }
                </select>
            </div>
            <Modal.Footer>
                <button onClick={editGame}>
                    Edit Game
                </button>
            </Modal.Footer>
        </div>
        
    );
};

export default EditForm;