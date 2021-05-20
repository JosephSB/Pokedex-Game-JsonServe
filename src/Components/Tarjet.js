import React from "react";
import '../App.css';

export default function Target(props){

    const handleClick = () =>{
        console.log("Estas tocando la tarjeta", props.name)
    }
    return(
    <>
        <div className={`Target ${props.mod}`}>
            <div className = "Cont_Datos_Pokemon">
                <span className={`ID_Pokemon ID ${props.mod}`}>{props.id}</span>
                <span className={`ID_Pokemon ${props.mod}`}>{props.tipo1.toUpperCase()}</span>
                {props.tipo2 !== undefined  ?<span className={`ID_Pokemon ${props.mod}`}>{props.tipo2.toUpperCase()}</span> :<span></span>}
            </div>
            <img className="Img-Target" src={props.img} alt={props.name}/>
            <h2 className={`Letter-Target ${props.mod}`}>{props.name}</h2>
            <button className="Info" onClick={handleClick}>Ver mas</button>
        </div>
    </>
    );
}