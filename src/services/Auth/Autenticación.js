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

   if(error){
    console.log(error)
   }
}