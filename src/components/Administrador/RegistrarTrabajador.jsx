import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import { registrarTrabajador } from "../../services/Trabajador";


function RegistrarTrabajador() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validarNombreCompleto = (nombreoApellido) => {
        const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü\s]{1,40}$/

        return nombreCompletoRegex.test(nombreoApellido)
    }


    const onSubmit = handleSubmit(async (data) => {
        const nombreValido = validarNombreCompleto(data.nombre)
        const apePaternoValido = validarNombreCompleto(data.apepaterno)
        const apeMaternoValido = validarNombreCompleto(data.apematerno)

        if (!nombreValido) {
            toast.error('El nombre debe incluir máximo 40 letras')
        } else if (!apePaternoValido) {
            toast.error('El apellido paterno debe incluir máximo 40 letras')
        } else if (!apeMaternoValido) {
            toast.error('El apellido materno debe incluir máximo 40 letras')
        }
        else {
            try {
                registrarTrabajador(data);
            } catch (e) {
                console.error("Error al crear trabajador: " + e)
            }
        }
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="nombre">Nombre
                    <input id="nombre" type="text" {...register("nombre", { required: true })} />
                    {errors.nombre && <span>Este campo es necesario</span>}
                </label>
                <label htmlFor="apePaterno">Apellido paterno
                    <input id="apePaterno" type="text" {...register("apepaterno", { required: true })} />
                    {errors.apepaterno && <span>Este campo es necesario</span>}
                </label>
                <label htmlFor="apeMaterno">Apellido materno
                    <input id="apeMaterno" type="text" {...register("apematerno", { required: true })} />
                    {errors.apematerno && <span>Este campo es necesario</span>}
                </label>
                <label htmlFor="tipoTrabajador">Tipo de trabajador
                    <select id="tipoTrabajador" {...register("tipo_trabajador", { required: true })}>
                        <option value="" disabled>Elija una opción</option>
                        <option value={1}>Tornero</option>
                        <option value={2}>Soldador</option>
                        <option value={3}>Ayudante</option>
                    </select >
                    {errors.tipo_trabajador && <span>Este campo es necesario</span>}
                </label>
                <button>Registrar</button>
            </form>
        </>
    )
}

export default RegistrarTrabajador;