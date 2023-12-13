import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { editarOrden, marcarEstadoOrden, visualizarOrden } from "../../services/OrdenTrabajo"
import { getTrabajadores } from "../../services/Trabajador"

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
      <form onSubmit={onSubmit}>
        <label htmlFor="orden">Número de orden
          <input id="orden" type="number" {...register("orden_trabajo")} disabled={true} />
        </label>
        <label htmlFor="fecha_solicitud">Fecha solicitud
          <input id="fecha_solicitud" type="date" {...register("fecha_solicitud")} disabled={true} />
        </label>
        <label htmlFor="fecha_entrega">Fecha entrega
          <input id="fecha_entrega" type="date" {...register("fecha_entrega")} disabled={!activateEdit} />
        </label>
        <label htmlFor="expecificaciones">Especificaciones del trabajo
          <textarea id="especificaciones" type="date" {...register("especificaciones")} disabled={!activateEdit}></textarea>
        </label>
        <label htmlFor="material_requerido">Material requerido
          <textarea id="material_requerido" type="text" {...register("material_requerido")} disabled={!activateEdit}></textarea>
        </label>
        <label htmlFor="precio_material">Precio del material
          <input id="precio_material" type="number" step="any" {...register("precio_material")} disabled={!activateEdit} />
        </label>
        <label htmlFor="precio_trabajo">Precio del trabajo
          <input id="precio_trabajo" type="number" step="any"  {...register("precio_trabajo")} disabled={!activateEdit} />
        </label>
        <label htmlFor="tipo_trabajo">Tipo de trabajo
          <select id="tipo_trabajo" {...register("tipo_trabajo")} disabled={!activateEdit}>
            <option value="Nuevo">Nuevo</option>
            <option value="Reparacion">Reparación</option>
          </select>
        </label>
        <label htmlFor="nom_cliente">Nombre del cliente
          <input id="nom_cliente" type="text" {...register("nom_cliente")} disabled={true} />
        </label>
        <label htmlFor="ape_paterno">Apellido paterno
          <input id="ape_paterno" type="text" {...register("ape_paterno_c")} disabled={true} />
        </label>
        <label htmlFor="ape_materno">Apellido materno
          <input id="ape_materno" type="text" {...register("ape_materno_c")} disabled={true} />
        </label>
        <label htmlFor="correo_cliente">Correo del cliente
          <input id="correo_cliente" type="text" {...register("correo_cliente")} disabled={true} />
        </label>
        <label htmlFor="telefono_cliente">Telefono del cliente
          <input id="telefono_cliente" type="text"{...register("telefono_cliente")} disabled={true} />
        </label>
        <label htmlFor="trabajador_asignado">Trabajadores asignados</label>

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
      {/*Mostrar mensaje de estado de orden */}
      {orden.estadot ? (
        <td>Pendiente</td>
      ) : (
        <td>Entregado</td>
      )}
      {/*Marcar estado de orden */}
      <input id="marcar_estado" type="checkbox" checked={!orden.estadot} onChange={handleEstadoChange}/>Trabajo entregado
    </>
  )
}

