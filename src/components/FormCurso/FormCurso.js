
import React from "react";
import "./FormCurso.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const FormCurso = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nombreCurso: "",
      matricula: "",
    },
  });

  const onSubmit = (data) => {

    const curso = (data.nombreCurso)
    axios
      .post("http://localhost:5000/api/v1/curso", data)

      .then((response) => {
        Swal.fire(
          `${curso} creado correctamente!`,
          "",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.response.data.error.errors.nombreCurso.message}`,
        });
      });
  };

  return (
    <>
      <div className="form-container">
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
                {...register("nombreCurso", {
                  required: 'El curso es requerido',
                  maxLength: {
                    value: 50,
                    message: "El nombre del curso solo puede tener máximo 50 caracteres",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre del curso debe tener mínimo 3 caracteres",
                  },
                })}
              />
              {errors?.nombreCurso && (
                <span className="error">{errors.nombreCurso.message}</span>
              )}
            </div>

            <div className="select-item-self select-item-number">
              <label htmlFor="asistencia">N° Matricula</label>
              <input
                className="group-selected-item selected-item"
                type="number"
                name="matricula"
                min="1"
                {...register("matricula", {
                  required: "La matricula es un parámetro requerido",
                  min: {
                    value: 1,
                    message: "El campo debe tener mínimo 1 matriculado",
                  },
                  max: {
                    value: 40,
                    message: "El campo solo puede tener maximo 40 matriculados",
                  },
                })}
              />
              {errors?.matricula && (
                <span className="error">{ errors.matricula.message }</span>
              )}
              
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
}

export default FormCurso