import { supabase } from "../supabase/connection";

const rpcGetClientes = "get_clientes";
const rpcSearchClient = "buscarcliente";

export const getClientes = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcGetClientes);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const buscarCliente = async (nombre) => {
  try {
    const { error, data } = await supabase.rpc(rpcSearchClient, {
      nombre_cliente: nombre,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
