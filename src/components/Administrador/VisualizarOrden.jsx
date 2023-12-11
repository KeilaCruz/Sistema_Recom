import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { editarOrden, visualizarOrden } from "../../services/OrdenTrabajo"
import { getTrabajadores } from "../../services/Trabajador"

export function VisualizarOrden() {
  let { id } = useParams()
  const { setValue, register, handleSubmit } = useForm()
  //const [orden, setOrden] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
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
      //setOrden(res[0])
      const orden = res[0];
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
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>Número de orden</label>
        <input id="orden" type="number" {...register("orden_trabajo")} disabled={true} />
        <label>Fecha solicitud</label>
        <input id="fecha_solicitud" type="date" {...register("fecha_solicitud")} disabled={true} />
        <label>Fecha entrega</label>
        <input id="fecha_entrega" type="date" {...register("fecha_entrega")} disabled={!activateEdit} />
        <label>Especificaciones del trabajo</label>
        <textarea id="especificaciones" type="date" {...register("especificaciones")} disabled={!activateEdit}></textarea>
        <label>Material requerido</label>
        <textarea id="material_requerido" type="text" {...register("material_requerido")} disabled={!activateEdit}></textarea>
        <label>Precio del material</label>
        <input id="precio_material" type="number" step="any" {...register("precio_material")} disabled={!activateEdit} />
        <label>Precio del trabajo</label>
        <input id="precio_trabajo" type="number" step="any"  {...register("precio_trabajo")} disabled={!activateEdit} />
        <label>Tipo de trabajo</label>
        <select id="tipo_trabajo" {...register("tipo_trabajo")} disabled={!activateEdit}>
          <option value="Nuevo">Nuevo</option>
          <option value="Reparacion">Reparación</option>
        </select>
        <label>Nombre del cliente</label>
        <input id="nom_cliente" type="text" {...register("nom_cliente")} disabled={true} />
        <label>Apellido paterno</label>
        <input id="ape_paterno" type="text" {...register("ape_paterno_c")} disabled={true} />
        <label>Apellido materno</label>
        <input id="ape_materno" type="text" {...register("ape_materno_c")} disabled={true} />
        <label>Correo del cliente</label>
        <input id="correo_cliente" type="text" {...register("correo_cliente")} disabled={true} />
        <label>Telefono del cliente</label>
        <input id="telefono_cliente" type="text"{...register("telefono_cliente")} disabled={true} />
        <label>Trabajadores asignados</label>

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
            <label htmlFor={`trabajador_${trabajador.idtrabajador}`}>
              {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}
            </label>
          </div>
        ))}
        {activateEdit && (
          <div>
            <button>Guardar</button>
          </div>
        )}
      </form>
      <button onClick={handleActivateEdit}>Editar</button>
    </>
  )
}

