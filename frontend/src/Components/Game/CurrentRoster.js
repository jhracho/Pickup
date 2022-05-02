import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';

const CurrentRoster = (props) =>{
    const id = props.id;
    const [users, setUsers] = useState([""]);

    useEffect(() =>{
        if (id !== undefined){
            axios.get('http://52.87.107.120:8802/api/roster/'+id).then(res =>{
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