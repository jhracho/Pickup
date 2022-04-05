import React, {useState, useEffect} from 'react';
import NavBar from '../Nav/NavBar';
import { isAuthed } from '../../Services/AuthService';

const HomePage = () =>{
    /*
    const [authed, setAuthed] = useState(5);

    useEffect(() =>{
        console.log('Start');
        var a = isAuthed();
        console.log('End Function: '+ a);
    }, []);
    */

    return(
        <div>
            <NavBar active='Home' />
            
            <h1>Hello</h1>
            
            <h1>Also Hello</h1>
        </div>
    );
};

export default HomePage;