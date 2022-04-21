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
                url: 'http://127.0.0.1:5000/api/signup',
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
                    localStorage.setItem("username", res.data['athlete_id'])
                    window.location.href = '/';
                }
                else{ alert(res.data['msg']); }
                }).catch((error) =>{
                    if (error.response){
                        alert(error.response.status)
                }
            });
        }
    }, [newUser, add]);

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
            <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} signUp={true} />
        </div>
    );
};

export default SignupAuth;