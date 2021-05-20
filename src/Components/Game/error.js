import React from 'react';

export default function ListErros(props) {
    return(
        <>
            <div className="Cont-errors">
                <p className="err">Vuelva a ingresar sus datos</p>
                <ul>
                {props.err.map(el => <li className="err" key={el}>-{el}</li>)}
                </ul>
            </div>
        </>
    )
}