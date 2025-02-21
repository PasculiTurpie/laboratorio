import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const AsignarCursoDocente = () => {
  const [curso, setCurso] = useState([]);
  const [docente, setDocente] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit, reset
  } = useForm({
    defaultValues: {
      cursoNivel: "",
      docenteAula: "",
    },
  });

  const onSubmit = (dataAsign) => {
    const payload = { curso: dataAsign.cursoNivel };

    axios
      .patch(
        `http://localhost:5000/api/v1/docente/${dataAsign.docenteAula}`,
        payload
      )
      .then((res) => {
        Swal.fire(
          "Curso Asignado con éxito!",
          "El curso se ha asignado exitosamente.",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al intentar asignar el curso, intente nuevamente",
        });
        console.log(error);
      });
    reset({
      cursoNivel: "",
      docenteAula: "",
    })
    
  };

  const getDocente = () => {
    // Fetch API to get the list of docentes
    axios
      .get("http://localhost:5000/api/v1/docente")
      .then((response) => {
        setDocente(response.data.allDocente);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCurso = () => {
    // Fetch API to get the list of curso
    axios
      .get("http://localhost:5000/api/v1/curso")
      .then((response) => {
        setCurso(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDocente();
    getCurso();
  }, []);

  return (
    <>
      <div className="form-container">
        <div className="form-curso">
          <h2>Asignar Curso a Docente</h2>
          {/* Formulario para crear un curso */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="select-group">
              <label htmlFor="docenteAula">Docente</label>
              <select
                className="selected-item"
                name="docenteAula"
                {...register("docenteAula", {
                  required: "Seleccione un docente",
                })}
              >
                <option value="">Docente</option>
                {docente.map((docente) => (
                  <option key={docente.id} value={docente._id}>
                    {docente.nombreDocente.toUpperCase()}{" "}
                    {docente.apellidoDocente.toUpperCase()}
                  </option>
                ))}
              </select>
              {errors?.docenteAula && (
                <span className="error">{errors.docenteAula.message}</span>
              )}
            </div>

            <div className="group-selected">
              <div className="select-item-self select-item-number">
                <label htmlFor="cursoNivel">Curso</label>
                <select
                  className="group-selected-item selected-item"
                  name="cursoNivel"
                  {...register("cursoNivel", {
                    required: "Seleccione un curso",
                  })}
                >
                  <option value="">Curso</option>
                  {curso?.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.nombreCurso.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
                {errors?.cursoNivel && (
                  <span className="error">{errors.cursoNivel.message}</span>
                )}
              </div>
            </div>

            <br />
            <div className="button-group">
              <button className="btn-curso" type="submit">
                Asignar Curso a Docente
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AsignarCursoDocente;
