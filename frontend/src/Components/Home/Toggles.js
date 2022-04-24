import React, {useState} from 'react';

const Toggles = ({football, golf, basketball, soccer, other, onChange}) => {
    return (
        <div className='preference-toggles'>
            <input type="checkbox" id="football-checkbox" name="football-checkbox" value="football" checked={football} onChange={onChange}/>
            <label htmlFor="football-checkbox">Football</label>
            <input type="checkbox" id="golf-checkbox" name="golf-checkbox" value="golf" checked={golf} onChange={onChange}/>
            <label htmlFor="golf-checkbox">Golf</label>
            <input type="checkbox" id="basketball-checkbox" name="basketball-checkbox" value="basketball" checked={basketball} onChange={onChange}/>
            <label htmlFor="basketball-checkbox">Basketball</label>
            <input type="checkbox" id="soccer-checkbox" name="soccer-checkbox" value="soccer" checked={soccer} onChange={onChange}/>
            <label htmlFor="soccer-checkbox">Soccer</label>
            <input type="checkbox" id="other-checkbox" name="other-checkbox" value="other" checked={other} onChange={onChange}/>
            <label htmlFor="other-checkbox">Other Sports</label>
        </div>
    );
}

export default Toggles;