export const validarNombre = (dato) => {
  const nombreCompletoRegex = /^[A-Za-zÁÉÍÓÚáéíóúü\s]{1,40}$/;

  return nombreCompletoRegex.test(dato);
};

export const validarTelefono=(dato)=>{
    const telefonoRegex = /^(\d{3}\s\d{3}\s\d{2}\s\d{2}|\d{10})$/

    return telefonoRegex.test(dato)
}

export const validarCorreo=(dato)=>{
    const correoRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return correoRegex.test(dato)
}


const correo1="asdadasd"
console.log(validarCorreo(correo1))