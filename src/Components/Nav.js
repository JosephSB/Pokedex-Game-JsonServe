import React,{useState,useEffect} from 'react';

let tipos = ["--Todos--","water", "fire", "rock", "grass", "electric","sand","dragon","fairy","bug","poison","normal"]

export default function Nav(props){
    const [type, setType] = useState("");
    const [buscador, setBuscador] = useState("");
    const [fixed, setFixed] = useState();
    useEffect(() => {
        window.onscroll = function() {
            var y = window.scrollY;
            if(y>= 300){
                setFixed("Fixed")
            }else{
                setFixed("")
            }
          };
    });

    return(
        <>
        <div className={`Header ${props.mod}`}>
            <h1 className={`Title-Header ${props.mod}`}>POKEAPI</h1>
        </div>
        <nav className={`Seccion-Buscador ${props.mod}`}>
            <div className="Conteiner-Seccion">
              <input type="text" className={`Buscador ${props.mod}`} onChange={e=>setBuscador(e.target.value)}></input>
              <button className={`btn fourth ${props.mod}`} onClick={(e)=>props.ClickBuscar(buscador,e)}>Buscar</button>
            </div>
            <p className={`Subtitle ${props.mod}`}>BUSCA POKEMONS POR TIPO</p> 
            <div className="Conteiner-Seccion">
              <select className={`Select ${props.mod}`} onChange={e => setType(e.target.value)}>
              {tipos.map((type, index) => <option className="Option" key={index}>{type}</option>)}
              </select>
              <button className={`btn fourth ${props.mod}`} onClick={(e)=> props.ClickTipo(type,e)}>Buscar Tipo</button>
            </div>
            <div className={`Conteiner-Seccion ${fixed} ${props.mod}`}>
                <button className="Button-Direction" onClick={props.Btn_Prevent}><i className="fas fa-backward"></i></button> 
                <p>{` Pokemons del ${props.page} al ${props.finalPage}   .`} </p>
                <button className="Button-Direction" onClick={props.Btn_Next}><i className="fas fa-forward"></i></button>
            </div>
        </nav>
        </>
    )
}