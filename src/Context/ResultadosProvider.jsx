import React, { createContext, useState } from "react";

const ResultadosContext = createContext();

export const ResultadosProvider=({ children }) =>{
  const [resultados, setResultados] = useState([]);

  const actualizarResultados = (data) => {
    setResultados(data);
  };

  return (
    <>
      <ResultadosContext.Provider value={{ resultados, actualizarResultados }}>
        {children}
      </ResultadosContext.Provider>
    </>
  );
}

export default ResultadosContext;
