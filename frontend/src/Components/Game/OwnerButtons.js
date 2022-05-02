import React, {useState, Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import EditForm from './EditForm';
import TeamSignupForm from './TeamSignupForm';

const OwnerButtons = (props) =>{
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [cancelShow, setCancelShow] = useState(false);
    const handleCancelClose = () => setCancelShow(false);
    const handleCancelShow = () => setCancelShow(true);

    const [teamShow, setTeamShow] = useState(false);
    const handleTeamClose = () => setTeamShow(false);
    const handleTeamShow = () => setTeamShow(true);
    
    function cancelGame(e){
        e.preventDefault();
        axios({
            method: 'DELETE',
            url: 'http://52.87.107.120:5000/api/deleteGame/'+props.game.id,
          }).then((res) =>{
              window.location.href = '/games/';
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });

    }
    var currentUser = Number(localStorage.getItem('athlete_id'));

    return(
        <Fragment>
            {currentUser === props.game.owner &&(
                <Fragment>
                    <button className='game-page-button' onClick={handleEditShow}>Edit</button>
                    <button className='game-page-button' onClick={handleCancelShow}>Cancel</button>
                </Fragment>
            )}

            <button className='game-page-button team-signup' onClick={handleTeamShow}>Sign Up Team</button>

            <Modal show={cancelShow} onHide={handleCancelClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Cancel Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? This action can't be undone...</Modal.Body>
                <Modal.Footer>
                    <button classsName='modal-footer-button' onClick={cancelGame}>
                        Cancel Game
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={handleEditClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Game</Modal.Title>
                </Modal.Header>
                <Modal.Body><EditForm game={props.game} /></Modal.Body>
            </Modal>

            <Modal show={teamShow} onHide={handleTeamClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up Your Team</Modal.Title>
                </Modal.Header>
                <Modal.Body><TeamSignupForm game={props.game} /></Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default OwnerButtons;