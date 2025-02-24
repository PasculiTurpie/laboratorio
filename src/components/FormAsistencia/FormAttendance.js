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
  const [isLoadingCurso, setIsLoadingCurso] = useState(false);

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


  const onSubmit = async (data) => {
    console.log(cursoValue)
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/asistencia`,
        data
      );
      Swal.fire({
        title: "Asistencia registrada",
        text: `La asistencia ha sido registrada con éxito`,
        icon: "success",
      });
      reset(); // Reseteamos después de que la API responde
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error}: Error al registrar la asistencia, intente nuevamente`,
      });
    }
  };

  const getDocente = () => {
    api
      ._getAllDocentes()
      .then((response) => response.json())
      .then((data) => {
        setDocente(data.allDocente);
      });
  };

  const getCurso = async () => {
    setIsLoadingCurso(true); // Indica que está cargando
    setMatriculaCurso(""); // Reseteamos la matrícula

    try {
      const response = await api._getDocenteById(idDocente);
      const data = await response.json();
      setCurso(data.curso);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCurso(false); // Una vez terminado, habilitamos el formulario
    }
  };

  const getHerramientas = () => {
    api
      ._getTools()
      .then((response) => response.json())
      .then((data) => {
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
    if (idDocente) {
      getCurso();
  }
  }, [idDocente]);

/*   const handleCursoOnChange = (e) => {

    console.log(e.target.value);
    
    setCursoValue(cursoSet);
    if (!cursoSet) {
      Swal.fire({
        title: "Error",
        text: "Debe seleccionar primero un docente",
        icon: "error",
      });
      return;
    }
    const result = curso.find((item) => item.nombreCurso === cursoSet);
    if (result) {
      setCursoValue(cursoSet);
      setMatriculaCurso(result.matriculaCurso);
    } else {
      console.warn("Curso no encontrado");
    }
  }; */

  const handleCursoOnChange = (e) => {
    const selectedCurso = e.target.value;
    console.log(e.target.value);
    setCursoValue(selectedCurso);
    console.log(selectedCurso);

    const cursoEncontrado = curso.find((item) => item.nombreCurso === selectedCurso);
console.log(cursoEncontrado);
    if (cursoEncontrado) {
      setMatriculaCurso(cursoEncontrado.matriculaCurso);
      setCursoValue(cursoEncontrado.nombreCurso);
    } else {
      setMatriculaCurso("");
    }
    console.log(cursoValue);
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
            onInput={handleClickIdDocente}
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
            <label htmlFor="cursoNivel">Cursos</label>
            <select
              className="group-selected-item selected-item"
              onInput={handleCursoOnChange}
              name="cursoNivel"
              {...register("cursoNivel", {
                required: "Seleccione un curso",
              })}
            >
              <option value="curso">Curso</option>
              {curso?.map((item) => {
                return (
                  <option key={item._id}>
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
            onInput={(e) => {
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
          <input
            type="submit"
            value="Enviar"
            className="btn-enviar"
            disabled={isLoadingCurso}
          />
        </div>
      </form>
    </div>
  );
};

export default FormAttendance;
