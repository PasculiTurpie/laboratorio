import React, { useEffect, useState } from "react";
import "./FormAttendance.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const FormAttendance = () => {
  const [curso, setCurso] = useState([]);
  const [docente, setDocente] = useState([]);
  const [matriculaCurso, setMatriculaCurso] = useState("");
  const [herramientas, setHerramientas] = useState([]);
  const [targetTools, setTargetTools] = useState();
  const [objetivos, setObjetivos] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      docenteAula: "",
      cursoNivel: "",
      matricula: "",
      asistencia: "",
      herramienta: "",
      objetivo: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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

  const getHerramientas = () => {
    axios
      .get("http://localhost:5000/api/v1/herramienta")
      .then((response) => {
        setHerramientas(response.data.tools);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getObjetivos = () => {
    axios
      .get(`http://localhost:5000/api/v1/herramienta/${targetTools}`)
      .then((response) => {
        console.log(response.data.objetivo);
        setObjetivos(response.data.objetivo);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  
  useEffect(() => {
    getDocente();
    getCurso();
    getHerramientas();
    getObjetivos();
  }, [targetTools]);
  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>

      <form
        className="form-asistencia"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
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
              <option key={docente.id} value={docente.id}>
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
              onClick={(e) => {
                console.log(e.target.selectedOptions[0].dataset.matricula);
                setMatriculaCurso(
                  e.target.selectedOptions[0].dataset.matricula
                );
              }}
              name="cursoNivel"
              {...register("cursoNivel", {
                required: "Seleccione un curso",
              })}
            >
              <option value="">Curso</option>
              {curso?.map((item) => {
                return (
                  <option
                    key={item._id}
                    value={item.nombreCurso}
                    data-matricula={item.matricula}
                  >
                    {item.nombreCurso.toUpperCase()}
                  </option>
                );
              })}
            </select>
         
          </div>

          <div className="select-item-self select-item-number">
            <label htmlFor="matricula">Matricula</label>
            <input
              name="matricula"
              className="group-selected-item selected-item group-selected"
              type="number"
              readOnly="true"
              value={matriculaCurso}
              {...register("matricula", {
                required: "La matricula es requerida",
              })}
            />
          </div>

          <div className="select-item-self select-item-number">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              name="asistencia"
              min={1}
              max={matriculaCurso}
              {...register("asistencia", {
                required: "Ingrese la asistencia",
                min: {
                  value: 1,
                  message: "La asistencia debe ser un número mayor o igual a 1",
                },
                max: {
                  value: `${matriculaCurso}`,
                  message: `La asistencia ser un número menor o igual a ${matriculaCurso}`,
                },
              })}
            />
          </div>
        </div>
        <span className="group-error">
          {errors?.cursoNivel && (
            <span className="error">{errors.cursoNivel.message}</span>
          )}
          <br />
          {errors?.asistencia && (
            <span className="error">{errors.asistencia.message}</span>
          )}
        </span>

        <div className="select-group">
          <label htmlFor="herramienta">Herramienta a utilizar</label>
          <select
            className="selected-item"
            name="herramientas"
            onClick={(e) => {
              console.log(e.target.selectedOptions[0].dataset.category);
              setTargetTools(e.target.selectedOptions[0].dataset.category);
            }}
            {...register("herramienta", {
              required: `Debe seleccionar una opción`,
            })}
          >
            <option value="">Seleccionar Herramienta</option>
            {herramientas?.map((herramienta) => (
              <option
                key={herramienta._id}
                value={herramienta.nombreTool}
                data-category={`${herramienta._id}`}
              >
                {herramienta.nombreTool.toUpperCase()}
              </option>
            ))}
          </select>
          {errors?.herramienta && (
            <span className="error">{errors.herramienta.message}</span>
          )}
        </div>

        <div className="select-group">
          <label htmlFor="objetivo">Objetivos a cumplir</label>
          <select className="selected-item" name="objetivo"
            {
          ...register('objetivo', {
              required: 'Debe seleccionar un objetivo',
            })
            }>
            <option value="">Seleccionar Objetivo</option>
            {
              objetivos?.map((obj) => (
                <option key={obj._id} value={obj.nombreObjetivo}>
                  {obj.nombreObjetivo.toUpperCase()}
                </option>
            ))}
          </select>
          {errors?.objetivo && <span className="error">{ errors.objetivo.message}</span>}
        </div>

        <div className="button-group">
          <button className="btn-enviar" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAttendance;
