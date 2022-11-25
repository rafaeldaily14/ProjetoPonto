import React, { useState, useEffect } from 'react';


const axios = require('axios');

export default function TabelaMembros(props) {
    const [id, setID] = React.useState(1);


    return (
        <div>
        <select onChange={e => setID(e.target.value)}>
            {props.membros.map(a => ( <option value={a.membroid}>{a.membroid} - {a.nome}</option>))}
        </select>
        id : {id}
        </div>
    )
}