import { supabase } from "../supabase/connection";

const rpcBuscarCliente = "buscar_cliente";
const rpcDetalleCliente = "detalle_cliente";
const rpcDatosCliente = "datos_cliente";

export const buscarCliente = async (
  idCliente,
  nombre,
  apePaterno,
  apeMaterno
) => {
  try {
    const { error, data } = await supabase.rpc(rpcBuscarCliente, {
      idcliente: idCliente,
      nombre_c: nombre,
      apepaterno_c: apePaterno,
      apematerno_c: apeMaterno,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const detalleCliente = async (idcliente) => {
  try {
    const { error, data } = await supabase.rpc(rpcDetalleCliente, {
      idcliente: idcliente,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const datosCliente = async (idcliente) => {
  try {
    const { data, error } = await supabase.rpc(rpcDatosCliente, {
      idcliente: idcliente,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};
