import { supabase } from "../supabase/connection";

const rpcRegistrarTrabajador = "add_empleado";
const rpcVisualizarTrabajadores = "get_trabajadores";

export const registrarTrabajador = async (trabajador) => {
    try {
        const { error } = await supabase.rpc(rpcRegistrarTrabajador,
            {
                nombre: trabajador.nombre,
                apepaterno: trabajador.apepaterno,
                apematerno: trabajador.apematerno,
                tipo_trabajador: trabajador.tipo_trabajador
            });
        if (error) throw error;
    } catch (error) {
        console.log(error)
    }
}

export const getTrabajadores = async () => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarTrabajadores);
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
    }
}