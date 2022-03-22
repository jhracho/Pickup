import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Landing = () =>{
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/test').then(res =>{
            const data = res.data['result'];
            console.log(data);
            setData(data);
        });
    }, []);
    
    return(
        <div id='test'>
            <h1>Hellooo :D</h1>
            {data}
            <button><Link to='/login'>Login</Link></button>
        </div>
    );
};

export default Landing;