import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';

const CurrentRoster = (props) =>{
    const id = props.id;
    const [users, setUsers] = useState([""]);

    useEffect(() =>{
        if (id !== undefined){
            axios.get('http://127.0.0.1:5000/api/roster/'+id).then(res =>{
                setUsers(res.data['data']);
            });
        }
    }, [id]);

    return(
        <Fragment>
            <ul>
                {users.map((user, index) =>(
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </Fragment>
    );
};

export default CurrentRoster;