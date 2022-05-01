import React, {useState, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import TeamForm from './TeamForm';

const AddTeamModal = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <Fragment>
        <button className="team-link-button" onClick={handleShow}>
            Add Team
        </button>

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Add Team</Modal.Title>
            </Modal.Header>
            <Modal.Body><TeamForm close={handleClose}/></Modal.Body>
            
        </Modal>
        </Fragment>
    );
};

export default AddTeamModal;