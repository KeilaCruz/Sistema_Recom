import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import Sidebar from "../partials/Sidebar";
import { registrarOrden } from "../../services/OrdenTrabajo";
import { getTrabajadores } from "../../services/Trabajador";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

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
        //const fechaActual = `${diaActual}-${mesActual}-${anioActual}`        
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

    const generarPDF = async (data)=> {
        const fecha = new Date()

        const documento = new jsPDF()
        documento.setFont("Arial", "normal")
        documento.setFontSize(20)        
        documento.text('Torno-Soldadura y Servicios En General RECOM \t', 40,10)
        documento.setFontSize(12)
        documento.text('AV. Uno 305 Col.Tierra y Libertad \tRFC: BARC820218UU7 \tCURP: BARC820218MVZRTL03', 15 , 20)
        documento.text('TEL. 9212066688 \tCorreo: Claus2118.cb@gmail.com \tCP.96580', 20, 30)
        documento.text(`Coatzacoalcos, Ver., a ${fecha}`,60,40)
        documento.text(`${data.nombre} ${data.ape_paterno} ${data.ape_materno}`, 60,50)
        documento.text(`Especificaciones del trabajo: ${data.especificaciones}`, 20, 60)        
        documento.text(`Tipo de trabajo: ${data.tipotrabajo}`, 20, 70)
        documento.text(`Material: ${data.materialtrabajo}`, 20, 80)
        documento.text(`Precio del material: ${data.preciomaterial}`, 20, 90)
        documento.text(`Precio del trabajo: ${data.precio}`, 20, 100)
        documento.text(`Trabajador: ${data.trabajadores}`, 20, 110)

        documento.save('Orden_Trabajo_1.pdf')//De momento
    }

    const onSubmit = handleSubmit(async (data) => {
        data.precio = parseFloat(data.precio)
        data.estado = true;
        data.preciomaterial = parseFloat(data.preciomaterial);
        data.trabajadores = trabajadoresSeleccionados;

        const fechaEntregaValida = validarFechaEntrega(data.fecha_entrega)
        const precioValido = validarPrecio(data.precio)
        const especificacionValida = validarEspecificaciones(data.especificaciones)
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
                generarPDF(data)
            } catch (e) {
                console.error("Error al registrar orden" + e)
            }
        }
    })

    return (
        <>
            <div className="fixed">
                {/*<Sidebar />*/}
            </div>

            <form className="flex flex-col gap-5 font-sans"
                onSubmit={onSubmit}>

                <div className="flex-col ml-80 mt-5">
                    <label className="etiqueta"> Fecha solicitud </label>
                    <input id="fecha_solicitud" type="date"
                        className="inputs"
                        readOnly {...register("fecha_solicitud", { required: true })} />
                    {errors.fecha_solicitud && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Fecha entrega </label>
                    <input id="fecha_entrega" type="date"
                        className="inputs"
                        {...register("fecha_entrega", { required: true })} />
                    {errors.fecha_entrega && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-80 mt-5">
                    <label className="etiqueta"> Tipo de trabajo </label>
                    <select id="tipo_trabajo"
                        className="selects"
                        {...register("tipotrabajo", { required: true })}>
                        <option value="" disabled>Elija una opción</option>
                        <option value="nuevo">Nuevo</option>
                        <option value="reparacion">Reparación</option>
                    </select>
                    {errors.tipotrabajo && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Material </label>
                    <textarea id="materiales_requeridos"
                        className="area_texto"
                        placeholder="Materiales requeridos" {...register("materialtrabajo")}></textarea>

                    <label className="etiqueta"> Precio del material </label>
                    <input id="precio_material" type="number"
                        className="inputs_precio"
                        placeholder="Precio del material" step="any" {...register("preciomaterial")} />
                </div>

                <div className="flex ml-80 mt-5">
                    <label className="etiqueta"> Precio del trabajo </label>
                    <input id="precio_trabajo" type="number" step="any"
                        className="inputs_precio"
                        {...register("precio", { required: true })} />
                    {errors.precio && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Especificaciones del trabajo </label>
                    <textarea id="descripcion"
                        className="area_texto"
                        placeholder="Escriba los detalles del trabajo a realizar" {...register("especificaciones", { required: true })}></textarea>
                    {errors.especificaciones && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-80 mt-5">
                    <label className="etiqueta"> Nombre </label>
                    <input id="nom_cliente" type="text"
                        className="inputs"
                        placeholder="Ej. Eduardo" {...register("nombre", { required: true })} />
                    {errors.nombre && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Apellido paterno </label>
                    <input id="ape_paterno" type="text"
                        className="inputs"
                        placeholder="Ej. Pérez" {...register("ape_paterno", { required: true })} />
                    {errors.ape_paterno && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Apellido materno </label>
                    <input id="ape_materno" type="text"
                        className="inputs"
                        placeholder="Ej. Ruiz" {...register("ape_materno", { required: true })} />
                    {errors.ape_materno && <span>Este campo es necesario</span>}
                </div>

                <div className="flex ml-80 mt-5">
                    <label className="etiqueta"> Correo </label>
                    <input id="correo" type="email"
                        className="inputs"
                        placeholder="Ej. edu12@" {...register("correo", { required: true })} />
                    {errors.correo && <span>Este campo es necesario</span>}

                    <label className="etiqueta"> Teléfono </label>
                    <input id="telefono" type="text"
                        className="inputs"
                        placeholder="Ej. 9212834738" {...register("telefono", { required: true })} />
                    {errors.telefono && <span>Este campo es necesario</span>}

                </div>

                <div className="ml-80 mt-5">
                    <label className="etiqueta"> Seleccione el trabajador </label>
                    {trabajadores.map((trabajador) => (
                        <div className="ml-10" key={trabajador.idtrabajador}>
                            <input className="ml-10" id="trabaador" type="checkbox" value={trabajador.idtrabajador} onChange={() => handleCheckboxChange(trabajador.idtrabajador)} />
                            <label className="etiqueta_checkbox" htmlFor={`trabajador_${trabajador.idtrabajador}`}>
                                {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}
                            </label>
                        </div>
                    ))}
                </div>


                <button 
                className="bg-[#3B315F] p-[10px] w-[150px] ml-80 mt-0
                 text-white text-[20px] font-sans font-medium rounded 
                 hover:bg-[#4D407E]">
                    Registrar
                    </button>
            </form>
        </>
    )
}

