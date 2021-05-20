export const helpValidador = ()=>{
    const validar = (User,Password,Email,modo) =>{
        let tipes_err = []

        //validar Usuario
        if(!(User.length >= 6)) tipes_err.push("El usuario tiene que tener mas de 6 caracteres")
        //validar password
        if(!(Password.length >= 10)) tipes_err.push("La contraseña tiene que tener mas de 10 caracteres")

        let mayuscula = false;
        let vacio = false;
        let numero = false;
        
        for(let i = 0;i<Password.length;i++){
            if(Password.charCodeAt(i) >= 65 &&Password.charCodeAt(i) <= 90) mayuscula = true;
            else if(Password.charAt(i) === " ") vacio = true;
            else if(Password.charCodeAt(i) >= 48 &&Password.charCodeAt(i) <= 57) numero = true;
        }
        if(mayuscula === false) tipes_err.push("La contraseña tiene que tener mayuscula")
        if(numero === false) tipes_err.push("La contraseña tiene que tener numeros")
        if(vacio === true) tipes_err.push("La contraseña no puede tener espacios vacios")

        //validar 
        if(modo === "Register"){
            let arroba = false;
            for(let i = 0;i<Email.length;i++){
                if(Email.charAt(i) === "@") arroba = true;
            }
            if(arroba === false) tipes_err.push("El email tiene que tener arroba")
        }
        return(tipes_err)
    }
    return{
        validar
    }
  
}