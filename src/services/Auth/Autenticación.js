import { supabase } from "../../supabase/connection";



export const iniciarSesion = async (datos) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: datos.correo,
      password: datos.contraseña,
    });
    if (error) {
      return null;
    } else {
      return data.user.id;
    }
  } catch (error) {
    console.log(error);
  }
};

export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  }

  return true;
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
    } else {
      return false;
    }

    if (error) {
      return error.message();
    }
  } catch (error) {
    return error;
  }
};

export const obtenerTipoCuenta = async (idusuario) => {
  /*try {
    const { error, data } = await supabase.rpc(rpcTipoCuenta, {
      id_usuario: idusuario,
    })
    console.log(data)
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  } */

  try {
    const { data, error } = await supabase
      .from("tipoUsuario")
      .select("rol")
      .eq("idusuario", idusuario)
      .single();
    if (error) console.log(error);
    return data.rol;
  } catch (error) {
    console.log(error);
  }
};

export const registrarTrabajador = async (datos) => {
  try {
    const { error, data } = await supabase.auth.signUp({
      email: datos.correo,
      password: datos.contraseña,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};
