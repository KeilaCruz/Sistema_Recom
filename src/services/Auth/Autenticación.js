import { supabase } from "../../supabase/connection";

export const iniciarSesion =async (datos)=>{
    try{
        const {data, error} = await supabase.auth.signInWithPassword({
            email: datos.correo,
            password: datos.contraseña,
        });

        if(error){
            return error;
        }else{
            return data.user.id;
        }


    }catch(error){
        console.log(error)
    }
}

export const cerrarSesion = async ()=>{
   const {error}  = await supabase.auth.signOut(); 
   
}

export const recuperarContraseña = async (email)=>{
    try{
        const {data, error} = await supabase.auth.resetPasswordForEmail(email)
        if(error){
            return false;
        }else{
            return true;
        }
        
    }catch(error){

        return 'Error al enviar email'
    }

}