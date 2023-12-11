import { useForm } from "react-hook-form"
import { registrarOrden } from "../../services/OrdenTrabajo";
import { useEffect, useState } from "react";
import { getTrabajadores } from "../../services/Trabajador";
export function RegistrarOrden() {
    const [trabajadores, setTrabajadores] = useState([]);
    const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([])
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        async function loadTrabajadores() {
            const res = await getTrabajadores();
            setTrabajadores(res);
        }
        loadTrabajadores();
    }, [])

    const handleCheckboxChange = (trabajadorId) => {
        setTrabajadoresSeleccionados(prev => (
            prev.includes(trabajadorId)
                ? prev.filter(id => id !== trabajadorId) : [...prev, trabajadorId]
        ));
    }
    const onSubmit = handleSubmit(async (data) => {
        data.precio = parseFloat(data.precio)
        data.estado = true;
        data.preciomaterial = parseFloat(data.preciomaterial);
        data.trabajadores = trabajadoresSeleccionados;
        console.log(data);
        registrarOrden(data);
    })
    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="fecha_solcitud"> Fecha solicitud
                    <input id="fecha_solicitud" type="date" {...register("fecha_solicitud", { required: true })} />
                </label>
                <label htmlFor="fecha_entrega"> Fecha entrega
                    <input id="fecha_entrega" type="date" {...register("fecha_entrega", { required: true })} />
                </label>
                <label htmlFor="precio_trabajo"> Precio del trabajo
                    <input id="precio_trabajo" type="number" step="any" {...register("precio", { required: true })} />
                </label>
                <label htmlFor="descripcion"> Especificaciones del trabajo
                    <textarea id="descripcion" placeholder="Escriba los detalles del trabajo a realizar" {...register("especificaciones", { required: true })}></textarea>
                </label>
                <label htmlFor="nom_cliente"> Nombre
                    <input id="nom_cliente" type="text" placeholder="Ej. Eduardo" {...register("nombre", { required: true })} />
                </label>
                <label htmlFor="ape_paterno"> Apellido paterno
                    <input id="ape_paterno" type="text" placeholder="Ej. Pérez" {...register("ape_paterno", { required: true })} />
                </label>
                <label htmlFor="ape_materno"> Apellido materno
                    <input id="ape_materno" type="text" placeholder="Ej. Ruiz" {...register("ape_materno", { required: true })} />
                </label>
                <label htmlFor="correo"> Correo
                    <input id="correo" type="email" placeholder="Ej. edu12@" {...register("correo", { required: true })} />
                </label>
                <label htmlFor="telefono"> Telefono
                    <input id="telefono" type="text" placeholder="Ej. 9212834738" {...register("telefono", { required: true })} />
                </label>
                <label htmlFor="tipo_trabajo"> Tipo de trabajo
                    <select id="tipo_trabajo" {...register("tipotrabajo", { required: true })}>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Reparacion">Reparación</option>
                    </select>
                </label>
                <label htmlFor="materiales_requeridos">
                    <textarea id="materiales_requeridos" placeholder="Materiales requeridos" {...register("materialtrabajo")}></textarea>
                </label>
                <label htmlFor="precio_material">
                    <input id="precio_material" type="number" placeholder="Precio del material" step="any" {...register("preciomaterial")} />
                </label>
                <label htmlFor="trabajador"> Seleccione el trabajador
                    {trabajadores.map((trabajador) => (
                        <div key={trabajador.idtrabajador}>
                            <input id="trabajador" type="checkbox" value={trabajador.idtrabajador} onChange={() => handleCheckboxChange(trabajador.idtrabajador)} />
                            <label htmlFor={`trabajador_${trabajador.idtrabajador}`}>
                                {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}
                            </label>
                        </div>
                    ))}
                </label>
                <button>Registrar</button>
            </form>
        </>
    )
}

