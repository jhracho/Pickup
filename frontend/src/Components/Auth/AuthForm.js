import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({user, onChange, onSubmit, signUp}) => {
    
    return(
        // <Fragment>
            <div className="container"> 
                {!signUp && (
                    <div className="card card-container"> 
                        <div className="dome-img"></div>
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
                        <div className="dome-img"></div>
                        <form className="signup-form" onSubmit={onSubmit} autoComplete="off">
                            <input id="signup-firstname-input" className="form-control" type="text" placeholder="First Name" name="first_name" value={user.first_name} onChange={onChange} required /> 
                            <input id="signup-lastname-input" className="form-control" type="text" placeholder="Last Name" name="last_name" value={user.last_name} onChange={onChange} required /> 
                            <input id="signup-username-input" className="form-control" type="text" placeholder="Username" name="username" value={user.username} onChange={onChange} required /> 
                            <div className="form-group">
                                <input type="email" id="signup-email-input" className="form-control" placeholder="Email address" name="email" value={user.email}  onChange={onChange} required/>
                                <small id="signup-email-hint" className="form-text text-muted">Please sign up with your student email.</small>
                            </div>
                            <div className="form-group">
                                <input type="tel" pattern="([0-9]{3}) [0-9]{3}-[0-9]{4}" id="signup-phone-input" className="form-control" placeholder="Phone Number" name="phone" value={user.phone} onChange={onChange} />
                                <small id="signup-phone-hint" className="form-text text-muted">Optional</small>
                            </div>
                            <div className="form-group">
                                <input type="password" id="signup-password-input" className="form-control" placeholder="Password" min="0" name="password" value={user.password}  onChange={onChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="password" id="signup-password-confirm" className="form-control" placeholder="Confirm Password" min="0" name="confirm" value={user.confirm}  onChange={onChange} required/>
                            </div>
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