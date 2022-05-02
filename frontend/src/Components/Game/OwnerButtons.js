import { getThemeProps } from '@mui/system';
import React, {useState, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import EditForm from './EditForm';

const OwnerButtons = (props) =>{
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [cancelShow, setCancelShow] = useState(false);
    const handleCancelClose = () => setCancelShow(false);
    const handleCancelShow = () => setCancelShow(true);
    
    function cancelGame(e){
        e.preventDefault();
        axios({
            method: 'DELETE',
            url: 'http://52.87.107.120:8802/api/deleteGame/'+props.game.id,
          }).then((res) =>{
              window.location.href = '/games/';
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });

    }
    return(
        <Fragment>
            <button className='game-page-button' onClick={handleEditShow}>Edit</button>
            <button className='game-page-button' onClick={handleCancelShow}>Cancel</button>

            <Modal show={cancelShow} onHide={handleCancelClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Cancel Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? This action can't be undone...</Modal.Body>
                <Modal.Footer>
                    <button onClick={cancelGame}>
                        Cancel Game
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={handleEditClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Game {props.game.location}</Modal.Title>
                </Modal.Header>
                <Modal.Body><EditForm game={props.game} /></Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default OwnerButtons;