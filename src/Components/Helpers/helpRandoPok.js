function generarNumRandom(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
function generarOrden(){
    return Math.floor(Math.random() * (4 - 1)) + 1;
}
function generarpokemon(num){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(res =>res.json())
        .then(pok => pok)
}

export const helpPokemon = () =>{
    const RandonPokemon = (nivel) =>{
        if(nivel === 1) return RandonNivel1(1,300)
        if(nivel === 2) return RandonNivel1(1,300)
        if(nivel === 3) return RandonNivel1(300,600)
        if(nivel === 4) return RandonNivel1(600,898)
        if(nivel === 5) return RandonNivel5(800,898)
    }
    const RandonNivel1 = (min,max) =>{
        let list = []
        let listCorrect = []
        let img = []
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.name))
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.name))
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.name))
        let pokcorrect = generarpokemon(generarNumRandom(min,max))
        pokcorrect.then(pok => img.push(pok.sprites.front_default))
        pokcorrect.then(pok => listCorrect.push(pok.name))

        let orden = generarOrden()

        if(orden === 1) pokcorrect.then(pok => list.splice(0,0,pok.name))
        else if(orden === 2) pokcorrect.then(pok => list.splice(1,0,pok.name))
        else if(orden === 3) pokcorrect.then(pok => list.splice(2,0,pok.name))
        else pokcorrect.then(pok => list.splice(3,0,pok.name))
        return{
            list, listCorrect,img
        } 
    }

    const RandonNivel5 = (min,max) =>{
        let list = []
        let listCorrect = []
        let img = []
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.types[0].type.name))
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.types[0].type.name))
        generarpokemon(generarNumRandom(min,max)).then(pok => list.push(pok.types[0].type.name))
        let pokcorrect = generarpokemon(generarNumRandom(min,max))
        pokcorrect.then(pok => img.push(pok.sprites.front_default))
        pokcorrect.then(pok => listCorrect.push(pok.types[0].type.name))

        let orden = generarOrden()

        if(orden === 1) pokcorrect.then(pok => list.splice(0,0,pok.types[0].type.name))
        else if(orden === 2) pokcorrect.then(pok => list.splice(1,0,pok.types[0].type.name))
        else if(orden === 3) pokcorrect.then(pok => list.splice(2,0,pok.types[0].type.name))
        else pokcorrect.then(pok => list.splice(3,0,pok.types[0].type.name))
        console.log(list)
        return{
            list, listCorrect,img
        } 
    }
    return{
        RandonPokemon
    }
}