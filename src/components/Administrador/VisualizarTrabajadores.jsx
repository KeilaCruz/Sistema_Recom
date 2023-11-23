import { useEffect } from "react"
import { useState } from "react"
import { getTrabajadores } from "../../services/Trabajador"

export function VisualizarTrabajadores() {
    const [trabajadores, setTrabajadores] = useState([])
    useEffect(() => {
        async function loadTrabajadores() {
            const res = await getTrabajadores();
            setTrabajadores(res)
        }
        loadTrabajadores();
    })
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

