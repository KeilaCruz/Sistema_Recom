import { useForm } from "react-hook-form"
import { registrarOrden } from "../../services/OrdenTrabajo";
export function RegistrarOrden() {
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        data.precio = parseFloat(data.precio)
        data.estado = true;
        console.log(data);
        registrarOrden(data);
    })
    return (
        <>
            <form onSubmit={onSubmit}>
                <label> Fecha solicitud
                    <input id="fecha_solicitud" type="date" {...register("fecha_solicitud", { required: true })} />
                </label>
                <label> Fecha entrega
                    <input id="fecha_entrega" type="date" {...register("fecha_entrega", { required: true })} />
                </label>
                <label> Precio del trabajo
                    <input id="precio_trabajo" type="number" step="any" {...register("precio", { required: true })} />
                </label>
                <label> Especificaciones del trabajo
                    <textarea id="descripcion" placeholder="Escriba los detalles del trabajo a realizar" {...register("especificaciones", { required: true })}></textarea>
                </label>
                <label> Nombre
                    <input id="nom_cliente" type="text" placeholder="Ej. Eduardo" {...register("nombre", { required: true })} />
                </label>
                <label> Apellido paterno
                    <input id="ape_paterno" type="text" placeholder="Ej. Pérez" {...register("ape_paterno", { required: true })} />
                </label>
                <label> Apellido materno
                    <input id="ape_materno" type="text" placeholder="Ej. Ruiz" {...register("ape_materno", { required: true })} />
                </label>
                <label> Correo
                    <input id="correo" type="email" placeholder="Ej. edu12@" {...register("correo", { required: true })} />
                </label>
                <label> Telefono
                    <input id="telefono" type="text" placeholder="Ej. 9212834738" {...register("telefono", { required: true })} />
                </label>
                <select id="tipo_trabajo" {...register("tipotrabajo", { required: true })}>
                    <option value="nuevo">Nuevo</option>
                    <option value="reparacion">Reparación</option>
                </select>
                <button>Registrar</button>
            </form>
        </>
    )
}

