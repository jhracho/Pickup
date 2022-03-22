import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LoginForm = () =>{
    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });

    function authenticate(e){
        e.preventDefault()
        // Axios Method to our api
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/login',
            data: {
              username: creds.username,
              password: creds.password
            }
          }).then((res) =>{
            const isAuth = res.data['auth'];
            if (isAuth){ window.location.href = '/'; }
            else{ alert(res.data['msg']); }
          }).catch((error) =>{
              if (error.response){
                  alert(error.response.status)
              }
          });

        setCreds({
            email: "",
            password: ""
        });
    }

    function handleChange(e){
        e.preventDefault();
        const {name, value: newVal} = e.target;
        setCreds({
            ...creds,
            [name]: newVal
        });
    };

    return(
        <div>
            <button><Link to='/'>Home</Link></button>
            <form>
               <input onChange = {handleChange} type="text" text={creds.username} name="username" placeholder="Username" value={creds.username} />
               <input onChange = {handleChange} type="password" text={creds.password} name="password" placeholder="Password" value={creds.password} /> 
               <button onClick={authenticate}>Submit</button>
            </form>
        </div>
    )
};

export default LoginForm;