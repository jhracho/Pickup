import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({user, onChange, onSubmit, phoneKeyDown, phoneKeyUp, signUp}) => {
    
    return(
        // <Fragment>
            <div className="container"> 
                {!signUp && (
                    <div className="card card-container"> 
                        <form className="login-form" onSubmit={onSubmit} autoComplete="off">
                            <input type="text" id="login-username-input" className="form-control" placeholder="Username" name="username" value={user.username} onChange={onChange} required autoFocus/>
                            <input type="password" id="login-password-input" className="form-control" placeholder="Password" name="password" value={user.password} onChange={onChange} required autoFocus/>
                        <button className="login-button btn btn-lg btn-block" type="submit">Log in</button><br />
                        <Link className= "signup-link" to="/SignUp">Don't have an account? Sign up here.</Link>
                        </form>
                    </div> 
                )}
                {signUp && (
                    <div className="card card-container-signup"> 
                        <form className="signup-form" onSubmit={onSubmit} autoComplete="off">
                            <input id="signup-firstname-input" className="form-control" type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={onChange} required /> 
                            <input id="signup-lastname-input" className="form-control" type="text" placeholder="Last Name" name="last_name" value={user.last_name} onChange={onChange} required /> 
                            <input id="signup-username-input" className="form-control" type="text" placeholder="Username" name="username" value={user.username} onChange={onChange} required /> 
                                <input type="email" id="signup-email-input" className="form-control" placeholder="Email address" name="email" value={user.email}  onChange={onChange} required/>
                                <input type="tel" pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" id="signup-phone-input" className="form-control" placeholder="Phone Number (Optional)" name="phone" value={user.phone} onChange={onChange} onKeyDown={phoneKeyDown} onKeyUp={phoneKeyUp} maxLength="14" />
                                <input type="password" id="signup-password-input" className="form-control" placeholder="Password" min="0" name="password" value={user.password}  onChange={onChange} required/>
                                <input type="password" id="signup-password-confirm" className="form-control" placeholder="Confirm Password" min="0" name="confirm" value={user.confirm}  onChange={onChange} required/>
                            
                        <button className="signup-button btn btn-lg btn-block" type="submit" onSubmit={onSubmit}>Sign Up</button><br />
                        <Link className= "login-link" to="/Login">Already have an account? Log in here.</Link>
                        </form>
                    </div>
                )}
            </div>
        // {/* </Fragment> */}
    );

};

export default AuthForm;