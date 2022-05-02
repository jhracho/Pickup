import React, { useEffect, useState } from "react";
import AuthForm from "../AuthForm.js";
import axios from "axios";

const SignupAuth = () => {
    const [newUser, setNewUser] = useState({
        username: '', 
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm: ''
    });

    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (newUser && add) {
            setAdd(false);
            axios({
                method: 'POST',
                url: 'http://52.87.107.120:5000/api/signup',
                data: {
                    username: newUser.username,
                    password1: newUser.password,
                    password2: newUser.confirm,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    phone: newUser.phone
                }
            }).then((res) =>{
                const isAuth = res.data['auth'];
                if (isAuth){
                    localStorage.setItem("athlete_id", res.data['athlete_id'])
                    window.location.href = 'http://52.87.107.120:8802/home';
                }
                else{ alert(res.data['msg']); }
                }).catch((error) =>{
                    if (error.response){
                        alert(error.response.status)
                }
            });
        }
    }, [newUser, add]);

    const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) || // Allow number line
            (key >= 96 && key <= 105) // Allow number pad
        );
    };

    const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
            (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
            (key > 36 && key < 41) || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
            )
    };

    const enforceFormat = (event) => {
        if(!isNumericInput(event) && !isModifierKey(event)) {
            event.preventDefault();
        }
    }

    const formatPhone = (e) => {
        if(isModifierKey(e)) {return;}

        const target = e.target;
        const input = e.target.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if(input.length > 6) {target.value = '(' + zip + ') ' + middle + '-' + last;}
        else if(input.length > 3) {target.value = '(' + zip + ') ' + middle;}
        else if(input.length > 0) {target.value = '(' + zip;}
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;

        setNewUser({
            ...newUser,
            [name]: newValue
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setAdd(true);
    };

    return (
        <div>
            <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} phoneKeyDown={enforceFormat} phoneKeyUp={formatPhone} signUp={true} />
        </div>
    );
};

export default SignupAuth;