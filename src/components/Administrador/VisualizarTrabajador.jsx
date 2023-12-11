import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import { darBajaTrabajador, editarTrabajador, getTrabajador, rolTrabajadores } from "../../services/Trabajador";

export function VisualizarTrabajador() {
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const [roles, setRoles] = useState([]);
    const [selectedRol, setSelectedRol] = useState("");
    const [activateEdit, setActivateEdit] = useState(false)

    useEffect(() => {
        async function loadData() {
            await loadRoles();
            await loadTrabajador();
        }
        loadData();
    }, []);

    const loadRoles = async () => {
        const res = await rolTrabajadores();
        setRoles(res);
    };

    const loadTrabajador = async () => {
        const res = await getTrabajador(id);
        setValue("id_trabajador", res[0].id_trabajador);
        setValue("nombre", res[0].nomtrabajador);
        setValue("ape_paterno", res[0].apepaterno);
        setValue("ape_materno", res[0].apematerno);
        setValue("id_rol_trabador", res[0].idroltrabajador);

        setSelectedRol(res[0].idroltrabajador);
        if (roles.length > 0 && roles[0]) {
            handleShowTipoPago(res[0].idroltrabajador);
        }
    };
    const handleSelected = (evt) => {
        const rol = evt.target.value;
        setSelectedRol(rol)

        handleShowTipoPago(rol);
    }
    const handleShowTipoPago = (selectRol) => {
        const tipoPago = {
            1: roles[0].tipo_pago,
            2: roles[2].tipo_pago,
            3: roles[1].tipo_pago,
        }
        setValue("tipo_pago", tipoPago[selectRol]);
    }
    const handleActivateEdit = () => {
        setActivateEdit(!activateEdit);
    }
    const handleDarBaja = async () => {
        const res = await darBajaTrabajador(id)
        console.log(res)
    }
    const onSubmit = handleSubmit(async (data) => {
        const res = await editarTrabajador(data);
        console.log(res);
    })
    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="id_trabajador">Id del trabajador
                    <input id="id_trabajador" type="number" {...register("id_trabajador")} disabled={true} />
                </label>
                <label htmlFor="nombre">Nombre del trabajador
                    <input id="nombre" type="text" {...register("nombre")} disabled={!activateEdit} />
                </label>
                <label htmlFor="ape_paterno">Apellido paterno
                    <input id="ape_paterno" type="text" {...register("ape_paterno")} disabled={!activateEdit} />
                </label>
                <label htmlFor="ape_materno">Apellido materno
                    <input id="ape_materno" type="text" {...register("ape_materno")} disabled={!activateEdit} />
                </label>
                <label htmlFor="id_rol_trabajador"> Tipo de trabajador
                    <select id="id_rol_trabajador" {...register("id_rol_trabajador")} value={selectedRol} onChange={handleSelected} disabled={!activateEdit}>
                        {roles.map((rol) => (
                            <option key={rol.id_tipo_trabajador} value={rol.id_tipo_trabajador}>{rol.descripcion}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="tipo_pago">Tipo de pago del trabajador
                    <input id="tipo_pago" type="text" {...register("tipo_pago")} disabled={true} />
                </label>
                {activateEdit && (
                    <div>
                        <button>Guardar</button>
                    </div>
                )}
            </form>
            <button onClick={handleDarBaja}>Dar de baja</button>
            <button onClick={handleActivateEdit}>Editar</button>
        </>
    )
}

