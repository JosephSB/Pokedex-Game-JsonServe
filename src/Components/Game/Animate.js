import React from 'react';

export default function Animate(props) {
    return(
        <>
            <img className="Img-Game" src={props.img} alt={props.img}></img>
            <h2 className="Title-Game">{props.name}</h2>
            <h4 className="Title-Game">Respuesta</h4>
            <h2 className={`animate ${props.resp}`}>{props.resp}</h2>
            <>
                {props.resp === "Correct" ? <span className="Title-Spam">+100 points</span> : <span className="Title-Spam"> -20 points</span>}
                <span className="Title-Spam"> Tu Score: {props.score}</span>
            </>
        </>
    )
}