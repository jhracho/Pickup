import React from "react";

import LoginAuth from "./LoginAuth.js";
import LoginWelcome from "./LoginWelcome.js";

const Login = () => {
    return (
        <div>
            <LoginWelcome />
            <LoginAuth />
        </div>
    );
};
export default Login;