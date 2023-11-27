import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TitleController({titulosRutas}) {

    const location = useLocation();
    useEffect(()=>{
        const rutaActual = location.pathname;
        const tituloBase = "Sistema RECOM"
        document.title = titulosRutas[rutaActual] || tituloBase;
    }, [location.pathname, titulosRutas])

    return null;
}

export default TitleController