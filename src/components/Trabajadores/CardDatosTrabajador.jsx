import React, { useState, useEffect } from "react";
import {
  darBajaTrabajador,
  editarTrabajador,
  getTrabajador,
  rolTrabajadores,
} from "../../services/Trabajador";
import DeleteButton from "../buttons/DeleteButton";
import { useForm } from "react-hook-form";
import EditButton from "../buttons/EditButton";
import AcceptButton from "../buttons/AcceptButton";
import CancelButton from "../buttons/CancelButton";
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function 
CardDatosTrabajador({ id }) {

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRol, setSelectedRol] = useState("");
  const [activateEdit, setActivateEdit] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

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
    setSelectedRol(rol);

    handleShowTipoPago(rol);
  };
  const handleShowTipoPago = (selectRol) => {
    const tipoPago = {
      1: roles[0].tipo_pago,
      2: roles[2].tipo_pago,
      3: roles[1].tipo_pago,
    };
    setValue("tipo_pago", tipoPago[selectRol]);
  };
  const handleActivateEdit = () => {
    setActivateEdit(!activateEdit);
  };
  const handleDarBaja = async () => {
    const res = await darBajaTrabajador(id);
    console.log(res)
    if(res==null){
      toast.success("El trabajador ha sido eliminado ")
      navigate(-1)

    }
  };
  const onSubmit = handleSubmit(async (data) => {
    const res = await editarTrabajador(data);
    console.log(res);
  });
  return (
    <>
      <details
        className="bg-colorSecundario gap-[15px] font-sans text-white px-4 py-4 rounded-[5px] "
        onClick={toggleDetails}
        open={true}
      >
        <summary className="flex flex-row items-center justify-between cursor-pointer">
          <p className="text-[18px] font-medium ">Datos del trabajador</p>

          <img
            src="/src/assets/icons/active/detailsActive-icon.svg"
            alt="icono para bajar dropdown"
            className={`${isOpen ? "rotate-90" : "-rotate-90"}`}
          />
        </summary>

        <section className="flex flex-col text-white gap-5 font-sans mt-5 ">
          <form className="flex flex-col" onSubmit={onSubmit}>
            <label className="text-[16px]">
              <strong>No. Trabajador</strong>
              <input
                type="number"
                {...register("id_trabajador")}
                disabled={true}
                className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2 ml-2"
              />
            </label>
            <section className="flex flex-row items-center gap-10 mt-5 ">
              <div className="flex flex-col gap-2">
                <label className="text-[16px]">
                  <strong>Nombre</strong>
                </label>

                <input
                  type="text"
                  {...register("nombre")}
                  disabled={!activateEdit}
                  className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-[16px]">
                  <strong>Apellido Paterno</strong>
                </label>
                <input
                  id="ape_paterno"
                  type="text"
                  {...register("ape_paterno")}
                  disabled={!activateEdit}
                  className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px]">
                  <strong>Apellido Materno</strong>
                </label>
                <input
                  id="ape_materno"
                  type="text"
                  {...register("ape_materno")}
                  disabled={!activateEdit}
                  className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[16px]">
                  <strong>Tipo trabajador</strong>
                </label>
                <select
                  id="id_rol_trabajador"
                  {...register("id_rol_trabajador")}
                  value={selectedRol}
                  onChange={handleSelected}
                  disabled={!activateEdit}
                  className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2"
                >
                  {roles.map((rol) => (
                    <option
                      key={rol.id_tipo_trabajador}
                      value={rol.id_tipo_trabajador}
                      className="bg-colorSecundario text-white hover:bg-white p-2"
                    >
                      {rol.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px]">
                  <strong>Tipo de pago</strong>
                </label>
                <input
                  id="tipo_pago"
                  type="text"
                  {...register("tipo_pago")}
                  
                  disabled={true}
                  className="bg-white text-colorSecundario px-2 py-1 rounded-[5px] mt-2"
                />
              </div>
            </section>
          </form>
          <section className="flex flex-row items-center  gap-4 mt-3 mb-3">
            {activateEdit ? (
              <>
                <CancelButton
                  label="Cancelar"
                  onClick={() => {
                    setActivateEdit(false);
                  }}
                />
                <AcceptButton label="Guardar" onClick={onSubmit} />
              </>
            ) : (
              <>
                <DeleteButton onClick={handleDarBaja} />
                <EditButton onClick={handleActivateEdit} />
              </>
            )}
          </section>
        </section>
      </details>
    </>
  );
}

export default CardDatosTrabajador;



{
  /*  if (!data || Object.keys(data).length === 0) {
    return <p>Cargando datos del trabajador...</p>;
  } */
}
