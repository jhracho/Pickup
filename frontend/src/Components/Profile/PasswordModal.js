import React, {Fragment, useState} from 'react';
import ChangePassword from './ChangePassword';
import Modal from 'react-bootstrap/Modal';

const PasswordModal = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <Fragment>
            <h5><button id="pswd-modal-button" className='password-button' onClick={handleShow}>Change Password</button></h5>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body><ChangePassword /></Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default PasswordModal;