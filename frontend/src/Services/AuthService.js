import axios from 'axios';

export const isAuthed = () => {
    console.log('Entered Function Function');
    var authed;
    axios.get('http://127.0.0.1:5000/api/isAuthed').then(res =>{
        authed = res.data['isAuthed'];
        return authed;
    });
};