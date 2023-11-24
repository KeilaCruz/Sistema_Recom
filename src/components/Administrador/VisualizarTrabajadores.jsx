import { useEffect, useState } from "react"
import { darBajaTrabajador, getTrabajadores } from "../../services/Trabajador"
import { useParams } from "react-router-dom"
export function VisualizarTrabajadores() {
    const [trabajadores, setTrabajadores] = useState([])
    useEffect(() => {
        async function loadTrabajadores() {
            const res = await getTrabajadores();
            setTrabajadores(res)
        }
        loadTrabajadores();
    })
    const handleDarBaja = async (idTrabajador) => {
        const res = await darBajaTrabajador(idTrabajador);
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Número de trabajador</td>
                        <td>Nombre</td>
                        <td>Cargo</td>
                    </tr>
                </thead>
                <tbody>
                    {trabajadores.map((trabajador) => (
                        <tr key={trabajador.idtrabajador}>
                            <td>{trabajador.idtrabajador}</td>
                            <td>{trabajador.nom_trabajador} {trabajador.apepaterno} {trabajador.apematerno}</td>
                            <td>{trabajador.tipotrabajador}</td>
                            <button onClick={()=> handleDarBaja(trabajador.idtrabajador)}>Eliminar</button>
                            <button>Editar</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

