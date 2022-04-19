import React, { useEffect, useState } from "react";
import AuthForm from "../AuthForm.js";
import axios from "axios";

// not routed, stateless component that swaps in to the auth parent

const SignupAuth = () => {
    // useState for the user properties
    // initial state - default empty state
    const [newUser, setNewUser] = useState({
        username: '', 
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm: ''
    });

    // flags for tracking updates - prevent useEffect from loading each time
    // initally false
    const [add, setAdd] = useState(false);

    // on update flag, run this useEffect
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
                    email: newUser.email
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
    }, [newUser, add]); // dependency array - values that are in the if statement

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

    // Return HTML for the form
    return (
        <div>
            <AuthForm user={newUser} onChange={onChangeHandler} onSubmit={onSubmitHandler} signUp={true} />
            {/* data in: user events out: changeHandler */}
        </div>
    );
};

export default SignupAuth;