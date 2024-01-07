import { supabase } from "../supabase/connection";


import jsPDF from "jspdf";
import format from "date-fns/format";
import es from "date-fns/esm/locale/es/index.js";

const rpcRegistrarOrden = "add_orden_trabajo";
const rpcVisualizarOrdenes = "get_ordenes_trabajo";
const rpcVisualizarOrderActivas = "get_ordenes_activas";
const rpcVisualizarOrderEntregada = "get_ordenes_realizadas";
const rpcBuscarOrden = "buscar_orden_trabajo";
const rpcVisualizarOrden = "get_orden";
const rpcEditarOrden = "edit_orden_trabajo";
const rpcVisualizarCalendario = "get_calendar_ordenes";
const rpcMarcarEntregado = "marcar_estado_orden";
export const registrarOrden = async (orden) => {
  try {
    const { error, data } = await supabase.rpc(rpcRegistrarOrden, {
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
      preciomaterial: orden.preciomaterial,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrdenTrabajo = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarOrdenes);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdenActivas = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarOrderActivas);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdenEntregada = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarOrderEntregada);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const buscarOrden = async (
  idOrden,
  fechaSolicitud,
  nombre,
  apePaterno,
  apeMaterno
) => {
  try {
    const { error, data } = await supabase.rpc(rpcBuscarOrden, {
      nom_c: nombre,
      ape_p: apePaterno,
      ape_m: apeMaterno,
      numero_o: idOrden,
      fecha_s: fechaSolicitud,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const visualizarOrden = async (idOrden) => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarOrden, {
      idorden: idOrden,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarOrden = async (orden) => {
  try {
    const { error } = await supabase.rpc(rpcEditarOrden, {
      idorden: orden.orden_trabajo,
      fechaentrega: orden.fecha_entrega,
      preciotrabajo: orden.precio_trabajo,
      especificaciones: orden.especificaciones,
      materialesrequeridos: orden.material_requerido,
      preciomaterial: orden.precio_material,
      trabajadores_id: orden.trabajadores,
    });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export const visualizarCalendario = async () => {
  try {
    const { error, data } = await supabase.rpc(rpcVisualizarCalendario);
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const marcarEstadoOrden = async (idOrden) => {
  try {
    const { error } = await supabase.rpc(rpcMarcarEntregado, {
      idorden: idOrden,
    });
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};


export const generarPDF = async (data, idordenregistrada, trabajadoresSeleccionados, trabajadores) => {
 
    const fecha = new Date();
    const fechaFormateada = format(fecha, "cccc d 'de' MMMM 'del' yyyy", {
      locale: es,
    });

    const trabajadoresText = trabajadoresSeleccionados
      .map((trabajadorId) => {
        const trabajador = trabajadores.find(
          (t) => t.idtrabajador === trabajadorId
        );
        return `${trabajador.nom_trabajador} ${trabajador.apepaterno} ${trabajador.apematerno} ${trabajador.tipotrabajador}`;
      })
      .join(", ");
    const documento = new jsPDF();

    documento.setFont("Arial", "normal");
    documento.setFontSize(20);
    documento.text("Torno-Soldadura y Servicios En General RECOM \t", 40, 10);
    documento.setFontSize(12);
    documento.text(
      "AV. Uno 305 Col.Tierra y Libertad \tRFC: BARC820218UU7 \tCURP: BARC820218MVZRTL03",
      15,
      20
    );
    documento.text(
      "TEL. 9212066688 \tCorreo: Claus2118.cb@gmail.com \tCP.96580",
      20,
      30
    );
    documento.text(`Coatzacoalcos, Ver., a ${fechaFormateada}`, 60, 40);
    documento.text(
      `Especificaciones del trabajo: ${data.especificaciones}`,
      20,
      60
    );
    documento.text(`Tipo de trabajo: ${data.tipotrabajo}`, 20, 70);
    documento.text(`Material: ${data.materialtrabajo}`, 20, 80);
    documento.text(`Precio del material: ${data.preciomaterial}`, 20, 90);
    documento.text(`Precio del trabajo: ${data.precio}`, 20, 100);
    documento.text(`Trabajadores: ${trabajadoresText}`, 20, 110);

    if (existeCliente) {
      const cliente = resultBusqueda[0];
      documento.text(
        `${cliente.nombre} ${cliente.ape_paterno} ${cliente.ape_materno}`,
        60,
        50
      );
      documento.save(
        `Orden_Trabajo_${cliente.nombre}_${idOrdenRegistrada}.pdf`
      );
    } else {
      documento.text(
        `${data.nombre} ${data.ape_paterno} ${data.ape_materno}`,
        60,
        50
      );
      documento.save(`Orden_Trabajo_${data.nombre}_${idOrdenRegistrada}.pdf`);
    }
  
};
