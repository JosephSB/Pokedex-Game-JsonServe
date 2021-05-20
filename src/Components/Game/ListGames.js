import React,{useState,useEffect, useRef} from 'react';
import {helpPokemon} from '../Helpers/helpRandoPok';
import Animate from './Animate';

export default function ListGames(props) {
    const [nivel, setNivel] = useState(1);
    const [cont, setCont] = useState(0);
    const [play, setPlay] = useState(false);
    const [imgPok, setImgPok] = useState();
    const [listpok, setListpok] = useState([]);
    const [pokCorrect, setPokCorrect] = useState();
    const [animate, setAnimate] = useState(false);
    const [resp, setResp] = useState(false);
    const [pokprev, setPokprev] = useState();
    const [imgprev, setImgprev] = useState();
    const [animateLevel, setAnimateLevel] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if(cont === 3){
            setNivel(nivel + 1)
            //efecto de pase de nivel
            setAnimateLevel(true)
            setCont(0)
            setTimeout(() => {
                setAnimateLevel(false)
            }, 2000);
            //--
            if(nivel === 5 && cont === 3){
                setPlay(false)
                setNivel(1)
                setCont(0)
            }
        }
    }, [cont]);

    useEffect(() => {
        let data = helpPokemon().RandonPokemon(nivel)
        setImgPok(data.img)
        setListpok(data.list)
        setPokCorrect(data.listCorrect)
    }, [score]);


    //console.log(helpPokemon().RandonPokemon(1).list)

    const handleClick = (e) =>{
        setAnimate(true)
        setPokprev(e.target.value)
        setImgprev(imgPok)
        if(e.target.value === pokCorrect[0]){
            setCont(cont + 1)
            setScore(score+100)
            setResp(true)
        }else{
            setScore(score-20)
            setResp(false)
            setCont(cont)
        }
        setTimeout(() => {
            setAnimate(false)
        }, 2000);
    }
    return(
        <>
            <div className="Container-Games"> 
                <span className="User-Gamer">Player: {props.user}</span>
                <h2 className="Title-Game">Adivina el Pokemon</h2>
                {play ? <>
                <aside className="Aside-Levels">
                    <div className="Level active">1</div>
                    <div className={nivel >= 2 ? "Level active" : "Level"}>2</div>
                    <div className={nivel >= 3 ? "Level active" : "Level"}>3</div>
                    <div className={nivel >= 4 ? "Level active" : "Level"}>4</div>
                    <div className={nivel >= 5 ? "Level active" : "Level"}>5</div>
                </aside>
                {animateLevel &&<span className="AnimateLevel">Nivel {nivel}</span> }
                {animate ? <Animate img={imgprev} name={pokprev} resp={resp ? "Correct" : "False"}></Animate> :<>
                <img className={`Img-Game nivel${nivel}`} src={imgPok} alt={imgPok}></img>
                <button className="Button-Game" onClick={handleClick} value={listpok[2]}>{listpok[2]}</button>
                <button className="Button-Game" onClick={handleClick} value={listpok[1]}>{listpok[1]}</button>
                <button className="Button-Game" onClick={handleClick} value={listpok[0]}>{listpok[0]}</button>
                <button className="Button-Game" onClick={handleClick} value={listpok[3]}>{listpok[3]}</button></>}
                </> 
                : <button className="Button-Game active" onClick={()=> setPlay(true)}>Play</button>}
            </div>
        </>
    )
}