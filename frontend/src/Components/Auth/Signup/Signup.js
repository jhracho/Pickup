import React from "react";

import SignupAuth from "./SignupAuth.js";
import SignupWelcome from "./SignupWelcome.js";

const Signup = () => {
    return (
        <div className='signup-body-div'>
            <SignupWelcome />
            <SignupAuth />
        </div>
    );
};
export default Signup;