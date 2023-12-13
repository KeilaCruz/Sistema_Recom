import { supabase } from "../supabase/connection";

const rpcRegistrarOrden = "add_orden_trabajo";
const rpcVisualizarOrdenes = "get_ordenes_trabajo";
const rpcVisualizarOrderActivas = "get_ordenes_activas";
const rpcVisualizarOrderEntregada = "get_ordenes_realizadas";
const rpcBuscarOrden = "buscar_orden_trabajo";
const rpcVisualizarOrden = "get_orden";
const rpcEditarOrden = "edit_orden_trabajo";
const rpcVisualizarCalendario = "get_calendar_ordenes";
export const registrarOrden = async (orden) => {
    try {
        const { error } = await supabase.rpc(rpcRegistrarOrden, {
            idcliente_b: orden.idCliente,
            name: orden.nombre,
            apepaterno: orden.ape_paterno,
            apematerno: orden.ape_materno,
            correo_electronico: orden.correo,
            telefono_c: orden.telefono,
            fechasolicitud: orden.fecha_solicitud,
            fechaentrega: orden.fecha_entrega,
            precio_o: orden.precio,
            especificacionestrabajo: orden.especificaciones,
            estado_o: orden.estado,
            tipotrabajo: orden.tipotrabajo,
            trabajadores_id: orden.trabajadores,
            materialrequerido: orden.materialtrabajo,
            preciomaterial: orden.preciomaterial
        });
        if (error) throw error;
    } catch (error) {
        console.error(error);
    }
}

export const getAllOrdenTrabajo = async () => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarOrdenes);
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getOrdenActivas = async () => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarOrderActivas);
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getOrdenEntregada = async () => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarOrderEntregada);
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const buscarOrden = async (idOrden, fechaSolicitud, nombre, apePaterno, apeMaterno) => {
    try {
        const { error, data } = await supabase.rpc(rpcBuscarOrden, {
            nom_c: nombre,
            ape_p: apePaterno,
            ape_m: apeMaterno,
            numero_o: idOrden,
            fecha_s: fechaSolicitud
        })
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const visualizarOrden = async (idOrden) => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarOrden, {
            idorden: idOrden
        })
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const editarOrden = async (orden) => {
    try {
        const { error } = await supabase.rpc(rpcEditarOrden,
            {
                idorden: orden.orden_trabajo,
                fechaentrega: orden.fecha_entrega,
                preciotrabajo: orden.precio_trabajo,
                especificaciones: orden.especificaciones,
                materialesrequeridos: orden.material_requerido,
                preciomaterial: orden.precio_material,
                trabajadores_id: orden.trabajadores
            })
        if (error) throw error;
    } catch (error) {
        console.log(error)
    }
}

export const visualizarCalendario = async () => {
    try {
        const { error, data } = await supabase.rpc(rpcVisualizarCalendario);
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}