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
            
        </>
    )
}

