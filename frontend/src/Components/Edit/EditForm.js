import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditForm = (props) =>{
    const [info, setInfo] = useState({
        name: "",
        owner: 0,
        sport: "",
        date: "",
        time: "",
        players: 0,
        loc: "" 
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
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/editGame',
            data: {
              id: info.id,
              name: info.name,
              owner: 10,
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

        setInfo({
            name: "",
            owner: 10,
            sport: "",
            date: "",
            time: "",
            players: 0,
            loc: "" 
        });
    };

    // props.game.date.substring(6, 10) + '-' + props.game.date.substring(0,2) + '-' + props.game.date.substring(3, 5)
    // defaultValue={props.game.time.substring(0,5)+props.game.time.substring(8,9)} 

    return(
        <div id='form-div'>
            <input onChange={handleChange} type='text' text={info.name} name='name' placeholoder='Game Name' defaultValue={props.game.name} maxLength='25' required />
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
            {props.game.date &&
            <input onChange={handleChange} type='date' text={info.date} name='date' placeholoder='Date' defaultValue={props.game.date.substring(6, 10) + '-' + props.game.date.substring(0,2) + '-' + props.game.date.substring(3, 5)} required />
            }
            {props.game.time &&
            <input onChange={handleChange} type='time' text={info.time} name='time' placeholoder='Time' defaultValue={props.game.time.substring(0,5)+props.game.time.substring(8,9)} required  />    
            }
            <input onChange={handleChange} type='number' text={info.players} name='players' placeholoder='Players Required' required  />
            <button onClick={editGame}>Submit</button>
        </div>
    );
};

export default EditForm;