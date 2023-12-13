import { useForm } from "react-hook-form"
import { registrarTrabajador } from "../../services/Trabajador";
export function RegistrarTrabajador() {
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        registrarTrabajador(data);
    });
    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="nombre">Nombre
                    <input id="nombre" type="text" {...register("nombre", { required: true })} />
                </label>
                <label htmlFor="apePaterno">Apellido paterno
                    <input id="apePaterno" type="text" {...register("apepaterno", { required: true })} />
                </label>
                <label htmlFor="apeMaterno">Apellido materno
                    <input id="apeMaterno" type="text" {...register("apematerno", { required: true })} />
                </label>
                <label htmlFor="tipoTrabajador">Tipo de trabajador
                    <select id="tipoTrabajador" {...register("tipo_trabajador", { required: true })}>
                        <option value={1}>Tornero</option>
                        <option value={2}>Soldador</option>
                        <option value={3}>Ayudante</option>
                    </select >
                </label>
                <button>Registrar</button>
            </form>
        </>
    )
}

