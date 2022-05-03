import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const TeamSignupForm = (props) =>{
    var curUser = localStorage.getItem('athlete_id')

    const [result, setResult] = useState("")
    const [teams, setTeams] = useState([{
        id: 0,
        sport: "",
        name: "",
        spots: 0
    }]);

    console.log(teams);
    const [signteam, setSignTeam] = useState({
        team: ""
    });

    function handleChange(e){
        e.preventDefault();
        const {name, value: newVal} = e.target;
        setSignTeam({
            ...signteam,
            [name]: newVal
        });
    };

    function signUpTeam(e){
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/signupTeam',
            data: {
              team: signteam.team,
              game_id: props.game.id,
              game_spots: props.game.needed
            }
          }).then((res) =>{
            alert(res.data['msg'])
            if (res.data['result'] === 'success')
                window.location.href='/game/'+props.game.id;
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });
    };

    useEffect(() => {
        axios.get('http://52.87.107.120:5000/api/teams/'+curUser).then(res =>{
            setResult(res.data['result']);
            if (res.data['result'] === 'error')
                return;
            else
                setTeams(res.data['data']);
        });
    }, [curUser]);

    return(
        <div>
            <div className='form-group'>
                    {result === 'success' ?(
                        <Fragment>
                            <label htmlFor="team-dropdown">Team</label>
                            <select required onChange={handleChange} name='team' id='team-dropdown'>
                                <option defaultValue="" selected disabled hidden>--</option>
                                {teams.map((team) => (
                                    <option defaultValue={team.name}>{team.name}</option>
                                ))}
                            </select>
                        </Fragment>
                    ) :
                    (<Fragment><h5>You aren't apart of any applicable teams.</h5></Fragment>)}
            </div>
            <Modal.Footer>
                <button className='modal-footer-button' onClick={signUpTeam}>
                    Sign Up Team
                </button>
            </Modal.Footer>
        </div>
    );
};

export default TeamSignupForm;