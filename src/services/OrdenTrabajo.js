import { supabase } from "../supabase/connection";

const rpcRegistrarOrden = "add_orden_trabajo";

export const registrarOrden = async (orden) => {
    try {
        const { error } = await supabase.rpc(rpcRegistrarOrden, {
            nombre: orden.nombre,
            ape_paterno: orden.ape_paterno,
            ape_materno: orden.ape_materno,
            correo: orden.correo,
            telefono: orden.telefono,
            fecha_solicitud : orden.fecha_solicitud,
            fecha_entrega: orden.fecha_entrega,
            precio: orden.precio,
            especificaciones_trabajo: orden.especificaciones,
            estado: true,
            tipo_trabajo: orden.tipo_trabajo,
        });
        if (error) throw error;
    } catch (error) {
        console.error(error);
    }
}

