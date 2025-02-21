import React, { useEffect, useState } from "react";
import "./FormAttendance.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../utils/apiv1";

const FormAttendance = () => {
  const [curso, setCurso] = useState([]);
  const [docente, setDocente] = useState([]);
  const [matriculaCurso, setMatriculaCurso] = useState("");
  const [herramientas, setHerramientas] = useState([]);
  const [targetTools, setTargetTools] = useState();
  const [objetivos, setObjetivos] = useState([]);
  const [idDocente, setIdDocente] = useState("");
  const [cursoValue, setCursoValue] = useState("");


  console.log(curso);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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
    axios
      .post(`http://localhost:5000/api/v1/asistencia`, data)
      .then((response) => {
        Swal.fire({
          title: "Asistencia registrada",
          text: `La asistencia ha sido registrada con éxito`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error}: Error al registrar la asistencia, intente nuevamente`,
        });
      });
    reset({
      docenteAula: "",
      cursoNivel: "",
      matricula: "",
      asistencia: "",
      herramienta: "",
      objetivo: "",
    });
    setMatriculaCurso(" ");
  };
  const getDocente = () => {
    api
      ._getAllDocentes()
      .then((response) => response.json())
      .then((data) => {
        console.log(data.allDocente);
        setDocente(data.allDocente);
      });
  };

  const getCurso = () => {
    // Fetch API to get the list of curso
    api
      ._getDocenteById(idDocente)
      .then((response) => response.json())
      .then((data) => {
        setCurso(data.curso);
        console.log(data.curso[0].nombreCurso);//Aqui se produce el curso
        setCursoValue(data.curso[0].nombreCurso);
        setMatriculaCurso(data.curso[0].matriculaCurso);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHerramientas = () => {
    api
      ._getTools()
      .then((response) => response.json())
      .then((data) => {
        console.log(data.tools);
        setHerramientas(data.tools);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getObjetivos = () => {
    api
      ._getObjetive(targetTools)
      .then((response) => response.json())
      .then((data) => {
        setObjetivos(data.objetivo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickIdDocente = (evt) => {
    console.log(evt.target.value);
    setIdDocente(evt.target.value);
  };

  useEffect(() => {
    getDocente();
    getHerramientas();
    getObjetivos();
  }, [targetTools]);

  useEffect(() => {
    getCurso();
    console.log(idDocente);
  }, [idDocente]);

  const handleCursoClick = (e) => {
    let cursoSet = cursoValue;
    cursoSet = e.target.value;
    console.log(cursoSet);
    
    setCursoValue(cursoSet);
    if (!cursoSet || !cursoSet === undefined) {
      Swal.fire({
        title: "Error",
        text: "Debe seleccionar primero un docente",
        icon: "error",
      });
      return;
    }
    const result = curso.find((item) => item.nombreCurso === cursoSet);
    console.log(result);
    if (result) {
      setCursoValue(cursoSet);
      setMatriculaCurso(result.matriculaCurso);
    } else {
      console.warn("Curso no encontrado");
    }
  };

  const handleCursoOnChange = () => {
    console.log(cursoValue, matriculaCurso);
  };


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
            onClick={handleClickIdDocente}
            {...register("docenteAula", {
              required: "Seleccione un docente",
            })}
          >
            <option value="">Docente</option>
            {docente.map((docente) => (
              <option key={docente._id} value={docente._id}>
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
              onClick={handleCursoClick}
              onChange={handleCursoOnChange}
              name="cursoNivel"
              {...register("cursoNivel", {
                required: "Seleccione un curso",
              })}
            >
              {curso?.map((item) => {
                console.log(item)
                {console.log(cursoValue, matriculaCurso)}
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
                  message: `La asistencia debe ser un número menor o igual a ${matriculaCurso}`,
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
              setTargetTools(e.target.selectedOptions[0].dataset.category);
            }}
            {...register("herramienta", {
              required: `Debe seleccionar una herramineta`,
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
          <select
            className="selected-item"
            name="objetivo"
            {...register("objetivo", {
              required: "Debe seleccionar un objetivo",
            })}
          >
            <option value="">Seleccionar Objetivo</option>
            {objetivos?.map((obj) => (
              <option key={obj._id} value={obj.nombreObjetivo}>
                {obj.nombreObjetivo.toUpperCase()}
              </option>
            ))}
          </select>
          {errors?.objetivo && (
            <span className="error">{errors.objetivo.message}</span>
          )}
        </div>

        <div className="button-group">
          <input type="submit" value="Enviar" className="btn-enviar" />
        </div>
      </form>
    </div>
  );
};

export default FormAttendance;
