import React,{useState} from 'react';
import "../Game/StylesGame.css"
import ListGames from './ListGames';
import Login from './Login';

export default function IndexGame(props) {
    const [logeado, setLogeado] = useState(false);
    const [user, setUser] = useState();
    return(
        <>
            <div className="Bg-Game">
                <span className="Exit-Button" onClick={()=>props.setGame(false)}>
                    <i className="fas fa-arrow-alt-circle-left"></i>  Back
                </span>
                {logeado ? <ListGames user={user}></ListGames> : <Login user={setUser} setLogeado={setLogeado}></Login>}
            </div>
        </>
    )
}