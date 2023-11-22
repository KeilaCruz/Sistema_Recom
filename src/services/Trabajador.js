import { supabase } from "../supabase/connection";

const rpcRegistrarTrabajador = "add_empleado";

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