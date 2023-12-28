const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$%&/()=?[]{},.-_"
   

export const generador=(longitud)=>{

    let contraseña = ""

    for(let i=0; i< longitud; i++ ){
        const caracterRandom = caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        contraseña+=caracterRandom;
    }

    return contraseña

}

