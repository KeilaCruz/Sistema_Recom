import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { editarOrden, marcarEstadoOrden, visualizarOrden } from "../../services/OrdenTrabajo"
import { getTrabajadores } from "../../services/Trabajador"
import { CardBusquedaCliente } from "./CardBusquedaCliente"

import Sidebar from "../partials/Sidebar"
export function VisualizarOrden() {
  let { id } = useParams()
  const { setValue, register, handleSubmit, formState: { errors }, getValues, watch } = useForm()
  const [trabajadores, setTrabajadores] = useState([]);
  const [orden, setOrden] = useState([]);
  const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([])
  const [activateEdit, setActivateEdit] = useState(false)
  const [fechaOriginal, setFechaOriginal] = useState('')

  const validarFechaEntrega = () => {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0)

    const data = getValues();
    const [dia, mes, anio] = data.fecha_entrega.split('/')
    const fechaEntrega = new Date(`${anio}/${mes}/${dia}`);

    console.log(fechaActual + " ---- " + fechaEntrega);

    // Comparar las fechas y horas completas
    if (fechaActual <= fechaEntrega) {
      return true;
    } else {
      return false;
    }
  }

  const validarPrecio = (precio) => {
    const precioRegex = /^[0-9][0-9.]{1,10}$/

    return precioRegex.test(precio)
  }

  const validarEspecificacionesYMaterial = (especificacionOMaterial) => {
    const especificacionRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9./\s-]{1,1000}$/

    return especificacionRegex.test(especificacionOMaterial)
  }

  useEffect(() => {
    async function loadTrabajadores() {
      const res = await getTrabajadores()
      setTrabajadores(res);
    }
    loadTrabajadores();
  }, [])

  useEffect(() => {
    async function loadOrden() {
      const res = await visualizarOrden(id);
      const orden = res[0];
      setOrden(orden);
      setValue("orden_trabajo", orden.ordentrabajo)
      setValue("fecha_solicitud", orden.fechasolicitud)
      setValue("fecha_entrega", orden.fechaentrega)
      setValue("especificaciones", orden.especificaciones)
      setValue("material_requerido", orden.materialrequerido)
      setValue("precio_material", orden.preciomaterial)
      setValue("precio_trabajo", orden.preciotrabajo)
      setValue("tipo_trabajo", orden.tipotrabajo)
      setValue("nom_cliente", orden.nomcliente)
      setValue("ape_paterno_c", orden.apepaterno)
      setValue("ape_materno_c", orden.apematerno)
      setValue("correo_cliente", orden.correoc)
      setValue("telefono_cliente", orden.telefonoc)

      setTrabajadoresSeleccionados(orden.idtrabajadores || [])
      setFechaOriginal(orden.fechaentrega)
    }
    loadOrden();
  }, [])

  const handleCheckboxChange = (trabajadorId) => {
    setTrabajadoresSeleccionados(prev => (
      prev.includes(trabajadorId)
        ? prev.filter(id => id !== trabajadorId) : [...prev, trabajadorId]
    ));
  }
  const handleActivateEdit = () => {
    setActivateEdit(!activateEdit);
  }
  const onSubmit = handleSubmit(async (data) => {
    data.precio_material = parseFloat(data.precio_material);
    data.precio_trabajo = parseFloat(data.precio_trabajo)
    data.trabajadores = trabajadoresSeleccionados;

    const validarPrecioMaterial = validarPrecio(data.precio_material)
    const validarPrecioTrabajo = validarPrecio(data.precio_trabajo)
    const fechaEntregaValida = validarFechaEntrega(data.fecha_entrega)
    const materialValidado = validarEspecificacionesYMaterial(data.material_requerido)
    const especificacionesvalidadas = validarEspecificacionesYMaterial(data.especificaciones)

    if (fechaOriginal === data.fecha_entrega) {
      if (!validarPrecioMaterial) {
        toast.error("El precio debe tener sólo números y punto decimal")
      } else if (!validarPrecioTrabajo) {
        toast.error("El precio debe tener sólo números y punto decimal")
      } else if (!materialValidado) {
        toast.error("Sólo se permiten caracteres alfanuméricos y ./-")
      } else if (!especificacionesvalidadas) {
        toast.error("Sólo se permiten caracteres alfanuméricos y ./-")
      }
      else {
        try {
          await editarOrden(data)
          handleActivateEdit()
        } catch (error) {
          console.error(error)
          toast.error("Ups ha ocurrido un error, vuelva a intentarlo")
        }
      }
    } else if (!fechaEntregaValida) {
      toast.error("La fecha de entrega debe ser posterior o igual a la actual")
    } else if (!validarPrecioMaterial) {
      toast.error("El precio debe tener sólo números y punto decimal")
    } else if (!validarPrecioTrabajo) {
      toast.error("El precio debe tener sólo números y punto decimal")
    } else if (!materialValidado) {
      toast.error("Sólo se permiten caracteres alfanuméricos y ./-")
    } else if (!especificacionesvalidadas) {
      toast.error("Sólo se permiten caracteres alfanuméricos y ./-")
    }
    else {
      try {
        await editarOrden(data)
        handleActivateEdit()
      } catch (error) {
        console.error(error)
        toast.error("Ups ha ocurrido un error, vuelva a intentarlo")
      }
    }
  })

  const handleEstadoChange = async () => {
    await marcarEstadoOrden(id);

    setOrden((prevOrden) => ({
      ...prevOrden, estadot: !prevOrden.estadot,
    }))
  }
  return (
    <div className="flex">
      <div className="w-1/4 sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="w-3/4 mt-0">

        <div className="ml-5 mt-5">
          <label className="etiqueta mt-5" htmlFor="orden">Número de orden</label>
          <input className="inputs" id="orden" type="number" {...register("orden_trabajo")} disabled={true} />
        </div>

        <div className="ml-5 mt-5 w-5/6 flex bg-colorSecundario rounded text-white">
          <div className="flex-col w-[1/2] ml-10 mb-5">
            <p className="mt-2 font-semibold">Nombre del cliente</p>
            <p>{watch("nom_cliente")} {watch("ape_paterno_c")} {watch("ape_materno_c")} </p>

            <p className="mt-2 font-semibold">Correo del cliente </p>
            <p> {watch("correo_cliente")}</p>
          </div>

          <div className="flex-col w-[1/2] ml-80 mb-5">            
            <p className="mt-2 font-semibold">Telefono del cliente</p>
            <p> {watch("telefono_cliente")} </p>
          </div>
          
        </div>

        <form className="flex font-sans mb-2">

          <div className="flex-col w-1/4 ml-5">
            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="fecha_solicitud">Fecha solicitud</label>
              <br />
              <input className="inputs" id="fecha_solicitud" type="date" {...register("fecha_solicitud")} disabled={true} />
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="tipo_trabajo">Tipo de trabajo</label>
              <br />
              <select className="selects" id="tipo_trabajo" {...register("tipo_trabajo")} disabled={true}>
                <option value="Nuevo">Nuevo</option>
                <option value="Reparacion">Reparación</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="precio_material">Precio del material</label>
              <br />
              <input className="inputs_precio" id="precio_material" type="number" step="any" {...register("precio_material")} disabled={!activateEdit} />
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="precio_trabajo">Precio del trabajo</label>
              <br />
              <input className="inputs_precio" id="precio_trabajo" type="number" step="any"  {...register("precio_trabajo")} disabled={!activateEdit} />
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="trabajador_asignado">Trabajadores asignados</label>
              <br />
              {trabajadores.map((trabajador) => (
                <div key={trabajador.idtrabajador}>
                  <input
                    id={`trabajador_${trabajador.idtrabajador}`}
                    type="checkbox"
                    value={trabajador.idtrabajador}
                    onChange={() => handleCheckboxChange(trabajador.idtrabajador)}
                    checked={trabajadoresSeleccionados.includes(trabajador.idtrabajador)}
                    disabled={!activateEdit}
                  />
                  <label className="etiqueta mt-5" htmlFor={`trabajador_${trabajador.idtrabajador}`}></label>
                  {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}

                </div>
              ))}
            </div>
          </div>

          <div className="flex-col w-1/4 ml-80">
            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="fecha_entrega">Fecha entrega </label>
              <br />
              <input className="inputs" id="fecha_entrega" type="date" {...register("fecha_entrega")} disabled={!activateEdit} />
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="material_requerido">Material requerido </label>
              <br />
              <textarea className="area_texto" id="material_requerido" type="text" {...register("material_requerido")} disabled={!activateEdit}></textarea>
            </div>

            <div className="mt-5">
              <label className="etiqueta mt-5" htmlFor="expecificaciones">Especificaciones del trabajo</label>
              <br />
              <textarea className="area_texto" id="especificaciones" type="date" {...register("especificaciones")} disabled={!activateEdit}></textarea>
            </div>

            <div className="ml-5 mt-5 mb-5">
              <label className="font-bold" htmlFor="Trabajo entregado">
                Trabajo entregado
              </label>              
              {/*Marcar estado de orden */}
              <input className="ml-5" id="marcar_estado"
                type="checkbox" checked={!orden.estadot} onChange={handleEstadoChange} />
              {/*Mostrar mensaje de estado de orden */}

              {orden.estadot ? (
                <td className="font-normal text-colorSecundario text-[16px]">Pendiente</td>
              ) : (
                <td className="font-semibold text-colorSecundario text-[16px]">Entregado</td>
              )}
            </div>

            <div className="ml-5 mt-5 mb-5">
              {!activateEdit && (<button className="boton_generico" onClick={handleActivateEdit}>
                Editar
              </button>
              )}

              {activateEdit && (
                //Llama a 2 métodos para permanecer en la misma página
                <button className="boton_generico" onClick={() => onSubmit()}>Guardar</button>
              )}
            </div>
          </div>

        </form>

      </div>
    </div>
  )
}

