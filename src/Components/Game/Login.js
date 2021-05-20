import React,{useState} from 'react';
import { helpValidador } from '../Helpers/helpValidador';
import { helpHttp } from '../Helpers/helpHttp';
import ListErros from './error';

const InitialForm ={
    id:null,
    Username:"",
    Password:"",
    FechaRegistro:"",
    Email:""
}

export default function Login(props){
    const [form, setForm] = useState(InitialForm);
    const [modo, setModo] = useState("Login");
    const [error, setError] = useState(false);
    const [listErr, setListErr] = useState([]);
    const [pass, setPass] = useState("Password");
    const [loader, setLoader] = useState(false);
    
    let url ="http://localhost:5000/Users"

    const Register = ()=>{
        form.id = Date.now()
        form.FechaRegistro = new Date().toLocaleDateString()
        let options = {
            body: form,
            headers: {"content-type": "application/json"}
        }
        helpHttp().post(url,options).then(res => {
            if(!res.err){
                alert("Se registro Correctamente")
                setLoader(false)
                setModo("Login")
            }else{
                alert("Ocurrio un error, por favor Intente denuevo")
                setLoader(false)
            } 
        })
        Reset()
    }
    const Login = ()=>{
        helpHttp().get(url).then(res => {
            if(!res.err){
                let passw = false
                res.forEach(el => {
                    if(el.Username === form.Username && el.Password === form.Password){
                        passw = true
                    }
                });
                if(passw === true){
                    alert("Inicio sesion correctamente")
                    setLoader(false)
                    props.setLogeado(true)
                    props.user(form.Username)
                }else{
                    alert("Usted no esta registrado, Cree una cuenta")
                    setLoader(false)
                }
            }else{
                alert("Ocurrio un error, por favor Intente denuevo")
                setLoader(false)
            } 
        })
        Reset()
    }

    const handleClick = (e) =>{
        e.preventDefault()
        let err = helpValidador().validar(form.Username, form.Password,form.Email,modo)
        if(err.length === 0){
            setLoader(true)
            setError(false)
            if(modo === "Login") Login()
            else Register()
        }else{
            setError(true)
            setListErr(err)
        }
    }
    const Reset = ()=>{
        setForm(InitialForm)
    }
    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const HandlePass = ()=>{
        setPass("Text")
        setTimeout(() => {
            setPass("Password")
        }, 1000);
    }

    return(
        <>  
            {loader ? <div className="preloader"></div> :
            <form className="Formulario" onSubmit={handleClick}>
                {modo === "Register" && <span className="Exit-Register" onClick={()=> setModo("Login")}>
                <i className="fas fa-arrow-alt-circle-left"></i>
                </span>}
                <h2 className="Form-Title">{modo === "Register" ? "Crear Cuenta" : "Inciar Sesion"}</h2>
                <input className="Form-Input" type="text" name="Username" placeholder="Usuario: " 
                onChange={handleChange} value={form.Username}></input>
                {modo === "Register" &&  <input className="Form-Input" type="Email" name="Email" placeholder="Email: " 
                onChange={handleChange} value={form.Email}></input>}
                <div className="Container-Password">
                    <input className="Form-Input" type={pass} name="Password" placeholder="Contraseña: " 
                    onChange={handleChange} value={form.Password}></input>
                    <span className="Look" onClick={HandlePass}><i className="fas fa-eye"></i></span>
                </div>
                <input className="Form-Input-Button" type="submit" value={modo}></input>
                {modo === "Login" &&  <span className="Form-Span" onClick={()=>
                    {setModo("Register") 
                    setError(false)
                    Reset()}
                }>¿No tienes una Cuenta? <span>Registrate</span></span>}
                {error && <ListErros err={listErr}></ListErros>}
            </form>}
        </>
    )
}