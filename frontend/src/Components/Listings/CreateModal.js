import React, {useState, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import GameForm from '../Game/Form';

const CreateModal = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /*
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

    function submitGame(e){
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/addGame',
            data: {
              name: info.name,
              owner: localStorage.getItem('athlete_id'),
              sport: info.sport,
              date: info.date,
              time: info.time,
              players: info.players,
              loc: info.loc
            }
          }).then((res) =>{
              alert('Game Created!')
              handleClose();
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
    */
    return(
        <Fragment>
        <button className="game-link-button add-button" onClick={handleShow}>
            Add Game
        </button>

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Add Game</Modal.Title>
            </Modal.Header>
            <Modal.Body><GameForm close={handleClose}/></Modal.Body>
            
        </Modal>
        </Fragment>
    );
};

export default CreateModal;