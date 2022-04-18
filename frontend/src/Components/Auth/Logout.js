import React, {useEffect, useState} from "react";
import axios from "axios";

const Logout = () => {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:5000/api/logout'
    }).then((res) => {
        localStorage.removeItem('athlete_id');
        window.location.href = '/login';
    }).catch((error) => {
        if(error.response) {
            alert(error.response.status)
        }
    });
};

export default Logout;