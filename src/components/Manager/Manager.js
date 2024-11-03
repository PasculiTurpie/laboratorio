import React from "react";
import "./Manager.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";


const Manager = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    axios.post('http://localhost:5000/api/v1/curso', data    )
      .then((response) => {       
        Swal.fire(
          'Curso creado correctamente!',
          'El curso ha sido creado exitosamente.',
          'success'
        )
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el curso, intente nuevamente",
        });
        console.error(error, {
          message: 'Error al crear el curso',
        });
       
      });
  };

  return (
    <>
      <div className="container-form">
        <div className="form-curso">
          <h2>Crear Curso</h2>
          {/* Formulario para crear un curso */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="select-group">
              <label htmlFor="nombreCurso">Nombre Curso</label>
              <input
                className="group-selected-item selected-item"
                type="text"
                name="nombreCurso"
                {...register("nombreCurso")}
              />
            </div>
            <div className="select-item-self">
              <label htmlFor="curso">N° Matricula</label>
              <input
                className="group-selected-item selected-item"
                type="number"
                name="matricula"
                min="1"
                {...register("matricula")}
              />
            </div>
            <br />
            <div className="button-group">
              <button className="btn-curso" type="submit">
                Crear Curso
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Manager;
