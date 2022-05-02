export const isAuthed = () =>{
    if (localStorage.getItem('athlete_id') !== null)
        return true;
    else
        return false;
};