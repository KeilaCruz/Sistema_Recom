import { useParams } from "react-router-dom"

export function VisualizarTrabajador() {
    const {id} = useParams();
    return (
        <>
            <h1>Hola {id}</h1>
        </>
    )
}

