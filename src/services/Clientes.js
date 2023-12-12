import { supabase } from "../supabase/connection";

const rpcBuscarCliente = "buscar_cliente";

export const buscarCliente = async (idCliente, nombre, apePaterno, apeMaterno) => {
    try {
        const { error, data } = await supabase.rpc(rpcBuscarCliente, {
            idcliente: idCliente,
            nombre_c: nombre,
            apepaterno_c: apePaterno,
            apematerno_c: apeMaterno
        })
        if (error) throw error
        return data;
    } catch (error) {
        console.log(error);
    }
}