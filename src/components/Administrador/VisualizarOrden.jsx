import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { editarOrden, marcarEstadoOrden, visualizarOrden } from "../../services/OrdenTrabajo"
import { getTrabajadores } from "../../services/Trabajador"
import Sidebar from "../partials/Sidebar"
export function VisualizarOrden() {
  let { id } = useParams()
  const { setValue, register, handleSubmit } = useForm()
  const [trabajadores, setTrabajadores] = useState([]);
  const [orden, setOrden] = useState([]);
  const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([])
  const [activateEdit, setActivateEdit] = useState(false)

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
    console.log(data)
    editarOrden(data)
  })
  const handleEstadoChange = async () => {
    await marcarEstadoOrden(id);

    setOrden((prevOrden) => ({
      ...prevOrden, estadot: !prevOrden.estadot,
    }))
  }
  return (
    <>
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex-col ml-80">
        <label className="etiqueta mt-5" htmlFor="orden">Número de orden</label>
        <input className="inputs" id="orden" type="number" {...register("orden_trabajo")} disabled={true} />
      </div>

      <form className="flex gap-5 font-sans">

        <div className="flex-col ml-80 mt-5">
          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="fecha_solicitud">Fecha solicitud</label>
            <input className="inputs" id="fecha_solicitud" type="date" {...register("fecha_solicitud")} disabled={true} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="tipo_trabajo">Tipo de trabajo</label>
            <select className="selects" id="tipo_trabajo" {...register("tipo_trabajo")} disabled={!activateEdit}>
              <option value="Nuevo">Nuevo</option>
              <option value="Reparacion">Reparación</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="precio_material">Precio del material</label>
            <input className="inputs_precio" id="precio_material" type="number" step="any" {...register("precio_material")} disabled={!activateEdit} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="precio_trabajo">Precio del trabajo</label>
            <input className="inputs_precio" id="precio_trabajo" type="number" step="any"  {...register("precio_trabajo")} disabled={!activateEdit} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="trabajador_asignado">Trabajadores asignados</label>
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

        <div className="flex-col ml-80 mt-5">
          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="fecha_entrega">Fecha entrega </label>
            <input className="inputs" id="fecha_entrega" type="date" {...register("fecha_entrega")} disabled={!activateEdit} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="material_requerido">Material requerido </label>
            <textarea className="area_texto" id="material_requerido" type="text" {...register("material_requerido")} disabled={!activateEdit}></textarea>
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="expecificaciones">Especificaciones del trabajo</label>
            <textarea className="area_texto" id="especificaciones" type="date" {...register("especificaciones")} disabled={!activateEdit}></textarea>
          </div>

        </div>

        <div className="flex-col ml-80 mt-5">
          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="nom_cliente">Nombre del cliente</label>
            <input className="inputs" id="nom_cliente" type="text" {...register("nom_cliente")} disabled={true} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="ape_paterno">Apellido paterno</label>
            <input className="inputs" id="ape_paterno" type="text" {...register("ape_paterno_c")} disabled={true} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="ape_materno">Apellido materno</label>
            <input className="inputs" id="ape_materno" type="text" {...register("ape_materno_c")} disabled={true} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="correo_cliente">Correo del cliente </label>
            <input className="inputs" id="correo_cliente" type="text" {...register("correo_cliente")} disabled={true} />
          </div>

          <div className="mt-5">
            <label className="etiqueta mt-5" htmlFor="telefono_cliente">Telefono del cliente</label>
            <input className="inputs" id="telefono_cliente" type="text"{...register("telefono_cliente")} disabled={true} />
          </div>

        </div>
      </form>

      <div className="ml-80 mt-5 mb-5">
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

      <div className="ml-80 mt-5 mb-5">
        {!activateEdit && (<button className="boton_generico" onClick={handleActivateEdit}>
          Editar
        </button>
        )}

        {activateEdit && (
          //Llama a 2 métodos para permanecer en la misma página
          <button className="boton_generico" onClick={() => { onSubmit(); handleActivateEdit() }}>Guardar</button>
        )}
      </div>
    </>
  )
}

