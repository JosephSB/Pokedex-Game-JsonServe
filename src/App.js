import './App.css';
import { useState } from 'react';
import ContainerFigures from './Components/Figures';
import Nav from './Components/Nav';
import IndexGame from './Components/Game/IndexGame';

function App() {
  const [mod, setMod] = useState("Dark");
  const [urlmodo, setUrlModo] = useState("fas fa-moon");
  const [configmodo, setConfigModo] = useState("MODE");
  const [page, setPage] = useState(1);
  const [finalPage, setFinalPage] = useState(50);
  const [modo, setModo] = useState("Normal");//modo de busqueda, por tipo, por nombre o normal
  const [tipo, setTipo] = useState();
  const [game, setGame] = useState(false);

  const handleClick =()=>{
    if(mod === "White"){
        setMod("Dark")
        setUrlModo("fas fa-moon")
        setConfigModo("MODE Dark")
    }else{
        setMod("White")
        setUrlModo("fas fa-sun")
        setConfigModo("MODE")
    }
  }

  const nextPage = () =>{
    if(modo !== "Busqueda por Name"){
      if(page < 899){
        setPage(page + 50)
        if(finalPage < 898){
          setFinalPage(finalPage + 50)
        }
      }else{
        alert("LLegaste al maximo de Pokemones")
      }
    }
  }
  const preventPage = () =>{
    if(modo !== "Busqueda por Name"){
      if(page === 1){
        alert("No puedes retrocedes mas")
      }else{
        setPage(page - 50)
        setFinalPage(finalPage - 50)
      }
    }
  }
  const handle = (name) =>{
    setModo("Busqueda por Name")
    setPage(1)
    setFinalPage(898)
    setTipo(name)
  }
  const handleTipo = (tipo) =>{
    setModo("Busqueda por Tipo")
    if(tipo === "--Todos--"){
      setPage(1)
      setFinalPage(50)
    }else{
      setPage(1)
      setFinalPage(898)
    }
    setTipo(tipo)
  }


  return (
    <>
      {game ? <IndexGame setGame={setGame}></IndexGame>:
      <>
        <span className={configmodo} onClick={handleClick}>
          <i className={urlmodo}></i>
        </span>
        <span className="ButtonGame" onClick={() =>setGame(true)}>
          <i className="fas fa-gamepad"></i>
        </span>
        <Nav 
        mod={mod} ClickTipo={handleTipo} ClickBuscar={handle} page={page} finalPage={finalPage}
        Btn_Next={nextPage} Btn_Prevent={preventPage}>
        </Nav>
        <ContainerFigures 
        setPage ={setPage}
        setFinalPage={setFinalPage}
        mod={mod} 
        setModo={setModo} 
        page={page} 
        finalPage={finalPage} 
        modo={modo} 
        tipo={tipo}
        ></ContainerFigures>
      </>
      }
    </>
  );
}

export default App;
