import { useEffect, useState } from "react"
import { getTrabajadores } from "../../services/Trabajador"
import { useNavigate } from "react-router-dom"
export function VisualizarTrabajadores() {
    const [trabajadores, setTrabajadores] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        async function loadTrabajadores() {
            const res = await getTrabajadores();
            setTrabajadores(res)
        }
        loadTrabajadores();
    })
    const handleNavigate = async (idTrabajador) => {
        navigate(`/visualizar-trabajador/${idTrabajador}`)
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
                            {/* Aquí ira un icono de una flechita*/}
                            <button onClick={() => handleNavigate(trabajador.idtrabajador)}>Detalles</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

