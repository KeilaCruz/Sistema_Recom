import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import { registrarOrden } from "../../services/OrdenTrabajo";
import { getTrabajadores } from "../../services/Trabajador";
import { useEffect, useState } from "react";

export function RegistrarOrden() {
    const [trabajadores, setTrabajadores] = useState([]);
    const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([])
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const getFechaSolicitud = () => {
        const fecha = new Date()
        const diaActual = fecha.getDate()
        const mesActual = fecha.getMonth() + 1
        const anioActual = fecha.getFullYear()
        const fechaActual = `${anioActual}-${mesActual}-${diaActual}`

        setValue('fecha_solicitud', fechaActual)

    }



    const validarFechaEntrega = () => {
        const fecha = new Date()
        const diaActual = fecha.getDay()
        const mesActual = fecha.getMonth()
        const anioActual = fecha.getFullYear()
        const fechaActual = new Date(diaActual, mesActual - 1, anioActual)

        const data = getValues()
        const fechaEntrega = new Date(data.fecha_entrega)

        if (fechaActual <= fechaEntrega) {
            return true
        } else {
            return false
        }
    }

    const validarPrecio = (precio) => {
        const precioRegex = /^[0-9][0-9.]{1,10}$/

        return precioRegex.test(precio)
    }

    const validarEspecificaciones = (especificacion) => {
        const especificacionRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9./\s-]{1,1000}$/

        return especificacionRegex.test(especificacion)
    }

    const validarNombreCompleto = (nombreoApellido) => {
        const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü\s]{1,40}$/

        return nombreCompletoRegex.test(nombreoApellido)
    }

    const validarCorreo = (correo) => {
        const correoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9_.+-]+@[A-Za-zÁÉÍÓÚáéíóúü0-9]+\.[A-Za-zÁÉÍÓÚáéíóúü0-9]+$/
        return correoRegex.test(correo)
    }

    const validarTelefono = (telefono) => {
        const telefonoRegex = /^[0-9]{10}$/

        return telefonoRegex.test(telefono)
    }

    useEffect(() => {
        getFechaSolicitud()

        async function loadTrabajadores() {
            const res = await getTrabajadores()
            setTrabajadores(res)
        }
        loadTrabajadores()
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

        const fechaEntregaValida = validarFechaEntrega(data.fecha_entrega)
        const precioValido = validarPrecio(data.precio)
        const especificacionValida = validarEspecificaciones(data.especificacion)
        const nombreCValida = validarNombreCompleto(data.nombre)
        const apePaternoCValida = validarNombreCompleto(data.ape_paterno)
        const apeMaternoCValida = validarNombreCompleto(data.ape_materno)
        const correoValido = validarCorreo(data.correo)
        const telefonoValido = validarTelefono(data.telefono)

        if (!fechaEntregaValida) {
            toast.error("La fecha de entrega debe ser posterior o igual a la actual")
        } else if (!precioValido) {
            toast.error("El precio ingresado sólo debe ser con números")
        } else if (!especificacionValida) {
            toast.error("Sólo se permiten caracteres alfanuméricos y ./-")
        } else if (!nombreCValida) {
            toast.error("El nombre debe ser máximo de 40 letras")
        } else if (!apePaternoCValida) {
            toast.error("El apellido paterno debe ser máximo de 40 letras")
        } else if (!apeMaternoCValida) {
            toast.error("El apellido materno debe ser máximo de 40 letras")
        } else if (!correoValido) {
            toast.error("El correo ingresado no es valido, asegurese que contenga @ y .")
        } else if (!telefonoValido) {
            toast.error("El teléfono debe ser de 10 dígitos numéricos")
        } else {
            try {
                registrarOrden(data);
                toast.success("Se ha registrado con éxito")
            } catch (e) {
                console.error("Error al registrar orden" + e)
            }
        }
    })

    return (
        <>
            <form className="flex flex-col gap-4 font-sans"
                onSubmit={onSubmit}>

                <div className="flex ml-10">
                    <label className="text-[18px] font-semibold"> Fecha solicitud </label>
                    <input id="fecha_solicitud" type="date"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F] ml-4"
                        readOnly {...register("fecha_solicitud", { required: true })} />
                    {errors.fecha_solicitud && <span>Este campo es necesario</span>}

                    <label className="text-[18px] font-semibold ml-10"> Fecha entrega </label>
                    <input id="fecha_entrega" type="date"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F] ml-4"
                        {...register("fecha_entrega", { required: true })} />
                    {errors.fecha_entrega && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-10" >
                    <label className="text-[18px] font-semibold"> Precio del trabajo </label>
                    <input id="precio_trabajo" type="number" step="any"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[100px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        {...register("precio", { required: true })} />
                    {errors.precio && <span>Este campo es necesario</span>}

                    <label className="text-[18px] font-semibold"> Especificaciones del trabajo </label>
                    <textarea id="descripcion"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Escriba los detalles del trabajo a realizar" {...register("especificaciones", { required: true })}></textarea>
                    {errors.especificaciones && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-10">
                    <label className="text-[18px] font-semibold"> Nombre </label>
                    <input id="nom_cliente" type="text"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Ej. Eduardo" {...register("nombre", { required: true })} />
                    {errors.nombre && <span>Este campo es necesario</span>}

                    <label className="text-[18px] font-semibold"> Apellido paterno </label>
                    <input id="ape_paterno" type="text"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Ej. Pérez" {...register("ape_paterno", { required: true })} />
                    {errors.ape_paterno && <span>Este campo es necesario</span>}

                    <label className="text-[18px] font-semibold"> Apellido materno </label>
                    <input id="ape_materno" type="text"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Ej. Ruiz" {...register("ape_materno", { required: true })} />
                    {errors.ape_materno && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-10">
                    <label className="text-[18px] font-semibold"> Correo </label>
                    <input id="correo" type="email"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Ej. edu12@" {...register("correo", { required: true })} />
                    {errors.correo && <span>Este campo es necesario</span>}

                    <label className="text-[18px] font-semibold"> Teléfono </label>
                    <input id="telefono" type="text"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[16px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Ej. 9212834738" {...register("telefono", { required: true })} />
                    {errors.telefono && <span>Este campo es necesario</span>}

                </div>

                <div className="flex ml-10">
                    <label className="text-[20px] font-semibold"> Tipo de trabajo </label>
                    <select id="tipo_trabajo"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[18px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        {...register("tipotrabajo", { required: true })}>
                        <option value="" disabled>Elija una opción</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="reparacion">Reparación</option>
                    </select>
                    {errors.tipotrabajo && <span>Este campo es necesario</span>}

                    <label className="text-[20px] font-semibold"> Material </label>
                    <textarea id="materiales_requeridos"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[18px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Materiales requeridos" {...register("materialtrabajo")}></textarea>

                    <label className="text-[20px] font-semibold"> Precio del material </label>
                    <input id="precio_material" type="number"
                        className="border-[1px] border-[#3B315F] p-[5px] rounded-[5px] w-[250px] text-[18px]  focus:border-[#3B315F]
                    focus:outline-none focus:ring-1 focus:ring-[#3B315F]"
                        placeholder="Precio del material" step="any" {...register("preciomaterial")} />
                </div>

                <label className="text-[20px] font-semibold"> Seleccione el trabajador </label>
                {trabajadores.map((trabajador) => (
                    <div key={trabajador.idtrabajador}>
                        <input id="trabaador" type="checkbox" value={trabajador.idtrabajador} onChange={() => handleCheckboxChange(trabajador.idtrabajador)} />
                        <label htmlFor={`trabajador_${trabajador.idtrabajador}`}>
                            {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}
                        </label>
                    </div>
                ))}

                <button type="submit" className="mt-[20px] bg-[#3B315F] p-[10px] text-white text-[20px] font-sans font-medium rounded hover:bg-[#4D407E]">Registrar</button>
            </form>
        </>
    )
}

