import { supabase } from "../../supabase/connection";

export const iniciarSesion = async (datos) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: datos.correo,
      password: datos.contraseña,
    });

    if (error) {
      return error;
    } else {
      return data.user.id;
    }
  } catch (error) {
    console.log(error);
  }
};

export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if(error){
    return true;
  }else{
    return false;
  }
};

export const recuperarContraseña = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/nueva-contraseña",
    });
    if (error) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return "Error al enviar email";
  }
};

export const actualizarContraseña = async (contraseña) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: contraseña,
    });

    if (data) {
      return true;
    }else{
        return false;
    }

    if(error){
        return error.message();
    }
  } catch (error) {
    return error;
  }
};
