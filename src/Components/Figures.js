import React, { useState,useEffect} from 'react';
import Target from "../Components/Tarjet"

export default function ContainerFigures(props) {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setPokemons([])
        setLoading(true)
        let cont = props.page
        let Cont_Final = props.finalPage
        
        while (cont <= Cont_Final ) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${cont}`)
            .then(res=> res.json())
            .then(data => {
                let tipo = data.types.map(el => el.type.name)
                let pokemon = {
                    id: data.id,
                    name:data.name,
                    img: data.sprites.front_default,
                    tipo1: tipo[0],
                    tipo2: tipo[1],
                }
                if(props.modo === "Normal"){
                    setPokemons((pokemons)=> [...pokemons,pokemon])
                    if(cont-1 === Cont_Final) setLoading(false)

                }else if(props.modo === "Busqueda por Tipo"){
                    if(pokemon.tipo1 === props.tipo || pokemon.tipo2 === props.tipo ){
                        setPokemons((pokemons)=> [...pokemons,pokemon])
                        setLoading(false)
                    }else if(props.tipo === "--Todos--"){
                        props.setModo("Normal")
                        setLoading(false)
                    }
                }else if(props.modo === "Busqueda por Name"){
                    if(pokemon.name === props.tipo.toLowerCase()){
                        setPokemons((pokemons)=> [...pokemons,pokemon])
                        setLoading(false)
                    }
                }
            })
            cont++ 
        }


    },[props.modo,props.tipo,props.finalPage]) 

    return(
        <>
        {loading ? <div className={`Content-Targets load ${props.mod}`}><div className="preloader"></div><p>Cargando Pokemons......</p></div> : 
        <div className={`Content-Targets ${props.mod}`}>
        {pokemons.map(el=> 
            <Target mod={props.mod} key={el.id} id={el.id} img={el.img} tipo1 ={el.tipo1} name={el.name} tipo2={el.tipo2}></Target> )} 
        </div>}
        </>
    )
}
