import React, {useState} from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState({
        old_password: '',
        password1: '',
        password2: ''
    });

    function handleChange(e){
        e.preventDefault();
        const {name, value: newVal} = e.target;
        setNewPassword({
            ...newPassword,
            [name]: newVal
        });
    };

    function submitPassword(e){
        console.log(newPassword);
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://52.87.107.120:5000/api/change-password',
            data: {
                athlete_id: localStorage.getItem('athlete_id'),
                old_password: newPassword.old_password,
                password1: newPassword.password1,
                password2: newPassword.password2
            }
        }).then((res) =>{
            if(res.data['result'] === 'success') {
                alert("Password successfully changed.");
                window.location.href = '/profile';
            }
            else{ alert(res.data['msg']); }
            }).catch((error) =>{
                if (error.response){
                    alert(error.response.status)
            }
        });

        setNewPassword({
            old_password:"",
            password1:"",
            pasword2:"" 
        });
    }

    return(
        <div id='form-div'>
            <div className='form-group'>
                <label htmlFor="old-pass-input">Old Password</label>
                <input onChange={handleChange} id='old-pass-input' type='text' text={newPassword.old_password} name='old_password' placeholoder='Old Password' maxLength='25' required />
            </div>
            <div className='form-group'>
                <label htmlFor="new-pass-input">New Password</label>
                <input onChange={handleChange} id='new-pass-input' type='text' text={newPassword.password1} name='password1' placeholoder='New Password' maxLength='25' required />
            </div>
            <div className='form-group'>
                <label htmlFor="confirm-pass-input">Confirm Password</label>
                <input onChange={handleChange} id='confirm-pass-input' type='text' text={newPassword.password2} name='password2' placeholoder='Confirm Password' maxLength='25' required />
            </div>
            <Modal.Footer>
            <button id='password-modal-footer' className='modal-footer-button pass-modal' onClick={submitPassword}>
                Update Password
            </button>
            </Modal.Footer>
        </div>
    );
};

export default ChangePassword;