import React from "react";

import LoginAuth from "./LoginAuth.js";
import LoginWelcome from "./LoginWelcome.js";

const Login = () => {
    return (
        <div className = 'login-body-div'>
            <div className = 'login-body-cols'>
                <div className='login-col images'>
                    <img src={require('../../../Assets/recsports2.png')} />
                    <img src={require('../../../Assets/recsports1.png')} />
                    <img src={require('../../../Assets/recsports3.png')} />
                </div>
                <div className='login-col form'>
                    <h2>Welcome back!</h2>
                    <LoginAuth />
                </div>
            </div>
        </div>
    );
};
export default Login;