import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthForm from "../AuthForm.js";

const LoginAuth = () => {
    
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    // flags for tracking updates
    const [check, setCheck] = useState(false);

    // on update flag, run this useEffect
    useEffect(() => {
        if (user && check) {
            setCheck(false);
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:5000/api/login',
                data: {
                  username: user.username,
                  password: user.password
                }
              }).then((res) =>{
                const isAuth = res.data['auth'];
                if (isAuth){
                    localStorage.setItem("athlete_id", res.data['athlete_id']);
                    window.location.href = '/';
                }
                else{ alert(res.data['msg']); }
              }).catch((error) =>{
                  if (error.response){
                      alert(error.response.status)
                  }
              });
        }
    }, [user, check]);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const { name, value: newValue } = e.target;

        setUser({
            ...user,
            [name]: newValue
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setCheck(true);
    };

    // Return HTML for the form
    return (
        <div>
            <AuthForm user={user} onChange={onChangeHandler} onSubmit={onSubmitHandler} signUp={false} />
        </div>
    );
};

export default LoginAuth;