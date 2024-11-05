import React from "react";
import "./FormDocente.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const FormDocente = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nombreDocente: "",
      apellidoDocente: "",
      emailDocente: ""
    },
  });

  const onSubmit = (dataDocente) => {
    console.log(dataDocente);
    axios
      .post("http://localhost:5000/api/v1/docente", dataDocente)
      .then((response) => {
        Swal.fire(
          "Docente creado correctamente!",
          "El Docente se ha creado exitosamente.",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al crear el Docente, intente nuevamente",
        });
        console.error(error, {
          message: "Error al crear el Docente",
        });
      });
  };

  return (
    <>
      <div className="form-container">
        <div className="form-curso">
          <h2>Crear Docente</h2>
          {/* Formulario para crear un curso */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="select-group">
              <label htmlFor="nombreDocente">Nombre Docente</label>
              <input
                className="group-selected-item selected-item"
                type="text"
                name="nombreDocente"
                {...register("nombreDocente", {
                  required: true,
                  maxLength: 50,
                  minLength: 10,
                })}
              />
              {errors?.nombreDocente?.type === "required" && (
                <span className="error">El campo es obligatorio</span>
              )}
              {errors?.nombreDocente?.type === "maxLength" && (
                <span className="error">
                  El campo solo puede tener maximo 50 caracteres
                </span>
              )}
              {errors?.nombreDocente?.type === "minLength" && (
                <span className="error">
                  El campo debe tener mínimo 10 caractres
                </span>
              )}
            </div>
            <div className="select-group">
              <label htmlFor="apellidoDocente">Apellidos Docente</label>
              <input
                className="group-selected-item selected-item"
                type="text"
                name="apellidoDocente"
                {...register("apellidoDocente", {
                  required: true,
                  maxLength: 50,
                  minLength: 10,
                })}
              />
              {errors?.apellidoDocente?.type === "required" && (
                <span className="error">El campo es obligatorio</span>
              )}
              {errors?.apellidoDocente?.type === "maxLength" && (
                <span className="error">
                  El campo solo puede tener maximo 50 caracteres
                </span>
              )}
              {errors?.apellidoDocente?.type === "minLength" && (
                <span className="error">
                  El campo debe tener mínimo 10 caractres
                </span>
              )}
            </div>
            <div className="select-group">
              <label htmlFor="nombreDocente">Email Docente</label>
              <input
                className="group-selected-item selected-item"
                type="text"
                name="emailDocente"
                {...register("emailDocente", {
                  required: "El campo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El email es invalido",
                  },
                })}
              />
              {errors?.emailDocente && (
                <span className="error">{errors.emailDocente.message}</span>
              )}
            </div>

            <br />
            <div className="button-group">
              <button className="btn-curso" type="submit">
                Crear Docente
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormDocente;
