import { useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import Sidebar from "../partials/Sidebar";
import { registrarOrden } from "../../services/OrdenTrabajo";
import { getTrabajadores } from "../../services/Trabajador";
import { buscarCliente } from "../../services/Clientes";
import { CardBusquedaCliente } from "./CardBusquedaCliente";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import format from "date-fns/format";
import es from "date-fns/esm/locale/es/index.js";
import { useNavigate } from "react-router-dom";

export function RegistrarOrden() {
    const [trabajadores, setTrabajadores] = useState([]);
    const [trabajadoresSeleccionados, setTrabajadoresSeleccionados] = useState([])
    const [resultBusqueda, setResultBusqueda] = useState([])
    const [idCliente, setIdCliente] = useState(null);
    const [criterioBusqueda, setCriterioBusqueda] = useState("");
    const [nombreCliente, setNombreCliente] = useState(null);
    const [apePaterCliente, setApePaterCliente] = useState(null);
    const [apeMaterCliente, setApeMaterCliente] = useState(null);
    const [existeCliente, setExisteCliente] = useState(false);
    const [idClienteResult, setIdClienteResult] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    let idOrdenRegistrada

    const navigate = useNavigate()

    let numberReg = /^\d+$/;
    let nombre = /^\D+$/;

    const getFechaSolicitud = () => {
        const fecha = new Date()
        const diaActual = fecha.getDate()
        const mesActual = fecha.getMonth() + 1
        const anioActual = fecha.getFullYear()
        //const fechaActual = `${diaActual}-${mesActual}-${anioActual}` 

        if (diaActual < 10) {
            let dia = "0" + diaActual
            const fechaActual = `${anioActual}-${mesActual}-${dia}`
            setValue('fecha_solicitud', fechaActual)
        } else {
            const fechaActual = `${anioActual}-${mesActual}-${diaActual}`
            setValue('fecha_solicitud', fechaActual)
        }

    }

    const validarFechaEntrega = () => {
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0)

        const data = getValues();
        const [dia, mes, anio] = data.fecha_entrega.split('/')
        const fechaEntrega = new Date(`${anio}/${mes}/${dia}`);

        console.log(fechaActual + " ---- " + fechaEntrega);

        // Comparar las fechas y horas completas
        if (fechaActual <= fechaEntrega) {
            return true;
        } else {
            return false;
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

    const loadTrabajadores = async () => {
        const res = await getTrabajadores()
        setTrabajadores(res)
    }

    const validarCriterioBusqueda = (criterioB) => {
        const criterioBRegex = /^[A-Za-zÁÉÍÓÚáéíóúü0-9\s]{1,120}$/

        return criterioBRegex.test(criterioB)
    }

    const handleBusqueda = async () => {
        resetBusqueda();
        const validacionBusqueda = validarCriterioBusqueda(criterioBusqueda)
        if (validacionBusqueda) {
            const isNumber = numberReg.test(criterioBusqueda);
            const isNombre = nombre.test(criterioBusqueda);
            if (isNumber) {
                const id_cliente = parseInt(criterioBusqueda);
                setIdCliente(id_cliente);
                setNombreCliente(null);
                setApePaterCliente(null);
                setApeMaterCliente(null);
            } else if (isNombre) {
                const nombres = criterioBusqueda.split(" ");
                setIdCliente(null);
                setNombreCliente(nombres[0]);
                setApePaterCliente(nombres[1]);
                setApeMaterCliente(nombres[2]);
            }
        } else {
            toast.error('Ingrese un dato valido');
        }

    }

    const handleBuscar = async () => {
        let resultado = await buscarCliente(idCliente, nombreCliente, apePaterCliente, apeMaterCliente);
        setResultBusqueda(resultado);
        if (Array.isArray(resultado) && resultado.length > 0) {
            setExisteCliente(true)
            setIdClienteResult(resultado[0].id_cliente);
        } else {
            setExisteCliente(false)
            toast.error("Ingrese el nombre completo, si aún así no aparece, entonces registrelo")
        }
    }
    const handleCheckboxChange = (trabajadorId) => {
        setTrabajadoresSeleccionados(prev => (
            prev.includes(trabajadorId) ? prev.filter(id => id !== trabajadorId) : [...prev, trabajadorId]
        ));
    }

    const resetBusqueda = () => {
        setResultBusqueda([]);
        setExisteCliente(false);
        setIdClienteResult(null);
    }

    useEffect(() => {
        getFechaSolicitud()
        loadTrabajadores()
    }, [])

    useEffect(() => {
        handleBusqueda();
    }, [criterioBusqueda])

    const onSubmit = handleSubmit(async (data) => {
        data.precio = parseFloat(data.precio)
        data.estado = true;
        data.preciomaterial = parseFloat(data.preciomaterial);
        data.trabajadores = trabajadoresSeleccionados;

        data.idCliente = idClienteResult;
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
        } else if (trabajadoresSeleccionados.length === 0) {
            toast.error("Debe seleccionar al menos a un trabajador")
        }
        else if (existeCliente) {
            try {
                idOrdenRegistrada = await registrarOrden(data);

                toast.success("Se ha registrado con éxito")
                //navigate("/trabajos")
                await generarPDF(data)

            } catch (e) {
                console.error("Error al registrar orden" + e)
            }
        } else {
            if (!nombreCValida) {
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

                    idOrdenRegistrada = await registrarOrden(data);

                    toast.success("Se ha registrado con éxito")
                    navigate("/trabajos")
                    await generarPDF(data)

                } catch (e) {
                    console.error("Error al registrar orden" + e)
                }
            }
        }
    })

    const generarPDF = async (data) => {
        const fecha = new Date()
        const fechaFormateada = format(fecha, "cccc d 'de' MMMM 'del' yyyy", { locale: es })

        const trabajadoresText = trabajadoresSeleccionados.map(trabajadorId => {
            const trabajador = trabajadores.find(t => t.idtrabajador === trabajadorId);
            return `${trabajador.nom_trabajador} ${trabajador.apepaterno} ${trabajador.apematerno} ${trabajador.tipotrabajador}`;
        }).join(', ');
        const documento = new jsPDF()

        documento.setFont("Arial", "normal")
        documento.setFontSize(20)
        documento.text('Torno-Soldadura y Servicios En General RECOM \t', 40, 10)
        documento.setFontSize(12)
        documento.text('AV. Uno 305 Col.Tierra y Libertad \tRFC: BARC820218UU7 \tCURP: BARC820218MVZRTL03', 15, 20)
        documento.text('TEL. 9212066688 \tCorreo: Claus2118.cb@gmail.com \tCP.96580', 20, 30)
        documento.text(`Coatzacoalcos, Ver., a ${fechaFormateada}`, 60, 40)
        documento.text(`Especificaciones del trabajo: ${data.especificaciones}`, 20, 60)
        documento.text(`Tipo de trabajo: ${data.tipotrabajo}`, 20, 70)
        documento.text(`Material: ${data.materialtrabajo}`, 20, 80)
        documento.text(`Precio del material: ${data.preciomaterial}`, 20, 90)
        documento.text(`Precio del trabajo: ${data.precio}`, 20, 100)
        documento.text(`Trabajadores: ${trabajadoresText}`, 20, 110);

        if (existeCliente) {
            const cliente = resultBusqueda[0]
            documento.text(`${cliente.nombre} ${cliente.ape_paterno} ${cliente.ape_materno}`, 60, 50)
            documento.save(`Orden_Trabajo_${cliente.nombre}_${idOrdenRegistrada}.pdf`)
        } else {
            documento.text(`${data.nombre} ${data.ape_paterno} ${data.ape_materno}`, 60, 50)
            documento.save(`Orden_Trabajo_${data.nombre}_${idOrdenRegistrada}.pdf`)
        }
    }

    return (
        <div className="flex">
            <div className="w-1/4 sticky top-0 h-screen">
                <Sidebar />
            </div>

            <div className="w-3/4 mt-0">

                <div className="ml-5 mt-5">
                    <input id="barra_busqueda"
                        placeholder="Núm cliente: 1, Nombre completo cliente: Keila Ruiz Miran"
                        className="inputs"
                        onChange={(evt) => setCriterioBusqueda(evt.target.value)} />

                    <button className="boton_busqueda" onClick={handleBuscar}>Buscar</button>
                    {resultBusqueda && resultBusqueda.map(cliente => (
                        <CardBusquedaCliente key={cliente.id_cliente} cliente={cliente} />
                    ))
                    }
                </div>

                <form className="flex font-sans" onSubmit={onSubmit}>

                    <div className="flex-col w-1/4 ml-5">
                        <div className="mt-5">
                            <label className="etiqueta"> Fecha solicitud </label>
                            <br />
                            <input id="fecha_solicitud" type="date" className="inputs"
                                readOnly {...register("fecha_solicitud", { required: true })} />
                            {errors.fecha_solicitud && <span>Este campo es necesario</span>}
                        </div>

                        <div className="mt-5">
                            <label className="etiqueta"> Tipo de trabajo </label>
                            <br />
                            <select id="tipo_trabajo"
                                className="selects"
                                {...register("tipotrabajo", { required: true })}>
                                <option value="" selected disabled>Elija una opción</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Reparacion">Reparación</option>
                            </select>
                            {errors.tipotrabajo && <span>Este campo es necesario</span>}
                        </div>

                        <div className="mt-5">
                            <label className="etiqueta"> Precio del material </label>
                            <br />
                            <input id="precio_material" type="number"
                                className="inputs_precio"
                                placeholder="Precio del material" step="any" {...register("preciomaterial")} />
                        </div>

                        <div className="mt-5">
                            <label className="etiqueta"> Precio del trabajo </label>
                            <br />
                            <input id="precio_trabajo" type="number" step="any"
                                className="inputs_precio"
                                {...register("precio", { required: true })} />
                            {errors.precio && <span>Este campo es necesario</span>}
                        </div>

                        <div className="mt-5 mb-5">
                            <label className="etiqueta"> Seleccione el trabajador </label>
                            <br />
                            {trabajadores && trabajadores.map((trabajador) => (
                                <div key={trabajador.idtrabajador}>
                                    <input id="trabaador" type="checkbox" value={trabajador.idtrabajador} onChange={() => handleCheckboxChange(trabajador.idtrabajador)} />
                                    <label className="etiqueta_checkbox" htmlFor={`trabajador_${trabajador.idtrabajador}`}>
                                        {trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno} {trabajador.tipotrabajador}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {!existeCliente && (
                            <div className="flex w-1/4 mb-5">
                                <div className="flex-row">
                                    <div className=" mt-5">
                                        <label className="etiqueta"> Nombre </label>
                                        <input id="nom_cliente" type="text"
                                            className="inputs"
                                            placeholder="Ej. Eduardo" {...register("nombre", { required: true })} />
                                    </div>
                                    <div className=" mt-5">
                                        <label className="etiqueta"> Correo </label>
                                        <input id="correo" type="email"
                                            className="inputs"
                                            placeholder="Ej. edu12@" {...register("correo", { required: true })} />
                                    </div>
                                </div>
                                <div className="flex-col ml-5">
                                    <div className=" mt-5">
                                        <label className="etiqueta"> Apellido paterno </label>
                                        <input id="ape_paterno" type="text"
                                            className="inputs"
                                            placeholder="Ej. Pérez" {...register("ape_paterno", { required: true })} />
                                    </div>
                                    <div className=" mt-5">
                                        <label className="etiqueta"> Teléfono </label>
                                        <input id="telefono" type="text"
                                            className="inputs"
                                            placeholder="Ej. 9212834738" {...register("telefono", { required: true })} />
                                    </div>
                                </div>
                                <div className=" ml-5 mt-5">
                                    <label className="etiqueta"> Apellido materno </label>
                                    <input id="ape_materno" type="text"
                                        className="inputs"
                                        placeholder="Ej. Ruiz" {...register("ape_materno", { required: true })} />
                                </div>
                            </div>
                        )}

                        <button
                            className="boton_generico">
                            Registrar
                        </button>
                    </div>

                    <div className="flex-col w-1/4 ml-80 mb-5">
                        <div className="mt-5">
                            <label className="etiqueta"> Fecha entrega </label>
                            <br />
                            <input id="fecha_entrega" type="date"
                                className="inputs"
                                {...register("fecha_entrega", { required: true })} />
                            {errors.fecha_entrega && <span>Este campo es necesario</span>}
                        </div>

                        <div className="mt-5">
                            <label className="etiqueta"> Material </label>
                            <br />
                            <textarea id="materiales_requeridos"
                                className="area_texto"
                                placeholder="Materiales requeridos" {...register("materialtrabajo")}></textarea>
                        </div>

                        <div className="mt-5">
                            <label className="etiqueta"> Especificaciones del trabajo </label>
                            <br />
                            <textarea id="descripcion"
                                className="area_texto"
                                placeholder="Escriba los detalles del trabajo a realizar" {...register("especificaciones", { required: true })}></textarea>
                            {errors.especificaciones && <span>Este campo es necesario</span>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

