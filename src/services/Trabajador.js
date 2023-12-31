import { tr } from "date-fns/locale";
import { supabase } from "../supabase/connection";

const rpcRegistrarTrabajador = "add_empleado";
const rpcVisualizarTrabajadores = "get_trabajadores";
const rpcDarBajaTrabajador = "delete_trabajador";
const rpcVisualizarTrabajador = "get_trabajador";
const rpcEditarTrabajador = "edit_trabajador";
const rpcRolTrabajador = "get_rol_trabajador";
const rpcOrdenesTrabajador = "get_trabajos_asignados";

export const registrarTrabajador = async (trabajador) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: trabajador.correo,
      password: trabajador.contraseña,
    });

    if (data) {
      const { error: TrabajadorError } = await supabase.rpc(
        rpcRegistrarTrabajador,
        {
          nombre: trabajador.nombre,
          apepaterno: trabajador.apellidoPaterno,
          apematerno: trabajador.apellidoMaterno,
          tipo_trabajador: trabajador.tipo_trabajador,
          estado_t: true,
          correo: trabajador.correo,
          contraseña: trabajador.contraseña,
          idusuario: data.user.id,
        }
      );

      const { error: userError } = await supabase.from("tipoUsuario").insert([
        {
          idusuario: data.user.id,
          rol: "trabajador",
        },
      ]);
    }

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrabajadores = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarTrabajadores);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const darBajaTrabajador = async (idTrabajador) => {
  try {
    const {data,  error } = await supabase.rpc(rpcDarBajaTrabajador, {
      idtrabajador: idTrabajador,
    });
    if (error) throw error;
    return data
  } catch (error) {
    console.log(error);
  }
};

export const getTrabajador = async (idTrabajador) => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarTrabajador, {
      idtrabajador: idTrabajador,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarTrabajador = async (trabajador) => {
  try {
    const { error } = await supabase.rpc(rpcEditarTrabajador, {
      idtrabajador: trabajador.id_trabajador,
      nombretrabajador: trabajador.nombre,
      apepaterno: trabajador.ape_paterno,
      apematerno: trabajador.ape_materno,
      tipotrabajador: trabajador.id_rol_trabajador,
    });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};
export const rolTrabajadores = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcRolTrabajador);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTrabajosAsignados = async (idtrabajador) => {
  try {
    const { error, data } = await supabase.rpc(rpcOrdenesTrabajador, {
      idtrabajador: idtrabajador,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};
