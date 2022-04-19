import React from "react";

/* this guy should be a modal that pops up when the change password button is pressed on the profile page. css is included below.

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .modal-content {
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

*/
const ChangePassword = ({newPassword, onChange, onSubmit}) => {
    return(
        <div id="change-password-modal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <div className="card card-container"> 
                    <div className="dome-img"></div>
                    <form className="login-form" onSubmit={onSubmit} autoComplete="off">
                        <input type="password" id="old-password-input" className="form-control" placeholder="Old Password" name="old_password" value={newPassword.old_password} onChange={onChange} required autoFocus/>
                        <input type="password" id="password1-input" className="form-control" placeholder="New Password" name="password1" value={newPassword.password1} onChange={onChange} required autoFocus/>
                        <input type="password" id="password2-input" className="form-control" placeholder="Confirm Password" name="password2" value={newPassword.password2} onChange={onChange} required autoFocus/>
                    <button className="submit-change-button btn btn-lg btn-block" type="submit">Submit</button><br />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;