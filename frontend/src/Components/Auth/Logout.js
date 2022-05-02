import React, {useEffect, useState} from "react";
import axios from "axios";

const Logout = () => {
    axios({
        method: 'GET',
        url: 'http://52.87.107.120:8802/api/logout'
    }).then((res) => {
        localStorage.removeItem('athlete_id');
        window.location.href = '/';
    }).catch((error) => {
        if(error.response) {
            alert(error.response.status)
        }
    });
};

export default Logout;