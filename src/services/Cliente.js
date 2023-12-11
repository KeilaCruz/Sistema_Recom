import { supabase } from "../supabase/connection";

const rpcGetClientes = "get_clientes";

export const getClientes = async () => {
  try {
    const { error,data } = await supabase.rpc(rpcGetClientes);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

