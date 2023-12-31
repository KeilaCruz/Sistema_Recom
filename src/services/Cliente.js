import { supabase } from "../supabase/connection";

const rpcGetClientes = "get_clientes";
const rpcSearchClient = "buscarcliente";
const rpcAddClient = "add_cliente";

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

export const agregarCliente = async (cliente) => {
  try {
    const { data, error } = await supabase.rpc(rpcAddClient, {
      nombre: cliente.nombre,
      apepaterno: cliente.apellidoPaterno,
      apematerno: cliente.apellidoMaterno,
      correo: cliente.correo,
      telefono: cliente.telefono,
    });

    if(data){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
