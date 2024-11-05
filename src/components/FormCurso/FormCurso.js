
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
    console.log(data);
    axios
      .post("http://localhost:5000/api/v1/curso", data)
      .then((response) => {
        Swal.fire(
          "Curso creado correctamente!",
          "El curso ha sido creado exitosamente.",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el curso, intente nuevamente",
        });
        console.error(error, {
          message: "Error al crear el curso",
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
                  required: true,
                  maxLength: 30,
                  minLength: 3,
                })}
              />
              {errors?.nombreCurso?.type === "required" && (
                <span className="error">El campo es obligatorio</span>
              )}
              {errors?.nombreCurso?.type === "maxLength" && (
                <span className="error">
                  El campo solo puede tener maximo 50 caracteres
                </span>
              )}
              {errors?.nombreCurso?.type === "minLength" && (
                <span className="error">
                  El campo debe tener mínimo 10 caractres
                </span>
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
                  required: true,
                  min: 1,
                  max: 40,
                })}
              />
              {errors?.matricula?.type === "required" && (
                <span className="error">Requerido</span>
              )}
              {errors?.matricula?.type === "max" && (
                <span className="error">
                  El campo solo puede tener maximo 40 matriculados
                </span>
              )}
              {errors?.matricula?.type === "min" && (
                <span className="error">
                  El campo debe tener mínimo 1 matriculado
                </span>
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