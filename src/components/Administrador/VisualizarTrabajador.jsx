import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { darBajaTrabajador, getTrabajador } from "../../services/Trabajador";

export function VisualizarTrabajador() {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    useEffect(() => {
        async function loadTrabajador() {
            const res = await getTrabajador(id);
            setValue("nombre", res[0].nomtrabajador)
            setValue("ape_paterno", res[0].apepaterno)
            setValue("ape_materno", res[0].apematerno)
            setValue("tipo_trabajador", res[0].tipotrabajador)
            setValue("tipo_pago", res[0].tipopago)
        }
        loadTrabajador();
    }, [id])
    const handleDarBaja = async () => {
        const res = await darBajaTrabajador(id)
        console.log(res)
    }
    const handleModificar = handleSubmit(() => { })
    return (
        <>
            <form>
                <label>Nombre del trabajador
                    <input id="nombre" type="text" {...register("nombre")} />
                </label>
                <label>Apellido paterno
                    <input id="ape_paterno" type="text" {...register("ape_paterno")} />
                </label>
                <label>Apellido materno
                    <input id="ape_materno" type="text" {...register("ape_materno")} />
                </label>
                <label>Tipo de trabajador
                    <input id="tipo_trabajador" type="text" {...register("tipo_trabajador")} />
                </label>
                <label>Tipo de pago del trabajador
                    <input id="tipo_pago" type="text" {...register("tipo_pago")} />
                </label>
            </form>
            <button onClick={handleDarBaja}>Dar de baja</button>
            <button>Modificar</button>
        </>
    )
}

