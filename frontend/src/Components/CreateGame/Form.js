import React, {useState} from 'react';
import axios from 'axios';

const CreateGameForm = () =>{
    const [info, setInfo] = useState({
        game: "",
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

    function submitGame(e){
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/addGame',
            data: {
              game: info.game,
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
            game: "",
            sport: "",
            date: "",
            time: "",
            players: 0,
            loc: "" 
        });
    }

    return(
        <div id='form-div'>
            <input onChange={handleChange} type='text' text={info.game} name='game' placeholoder='Game Name' maxLength='25' required />
            <select required onChange={handleChange} name='sport'>
                <option value="" selected disabled hidden>Sport</option>
                <option value='Football'>Football</option>
                <option value='Soccer'>Soccer</option>
                <option value='Golf'>Golf</option>
                <option value='Baseball'>Baseball</option>
                <option value='Other'>Other</option>
            </select>
            <input onChange={handleChange} type='date' text={info.date} name='date' placeholoder='Date' required  />
            <input onChange={handleChange} type='time' text={info.time} name='time' placeholoder='Time' required  />
            <input onChange={handleChange} type='number' text={info.players} name='players' placeholoder='Players Required' required  />
            <button onClick={submitGame}>Submit</button>
        </div>
    );
};

export default CreateGameForm;