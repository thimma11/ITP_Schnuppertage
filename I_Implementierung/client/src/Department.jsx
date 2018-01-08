import React from 'react';


export default function Department(props) {
    return (
        <div>
            <h3>{ props.abteilung.bezeichnung }</h3>
            <button onClick={ () => props.ShowDepartment(props.abteilung.id) } >Schnuppertage anzeigen</button>
        </div>
    );

}