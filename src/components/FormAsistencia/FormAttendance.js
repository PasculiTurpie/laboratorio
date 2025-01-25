import React, { useEffect, useState } from "react";
import "./FormAttendance.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const FormAttendance = () => {
  const [curso, setCurso] = useState([]);
  const [docente, setDocente] = useState([]);
  const [matriculaCurso, setMatriculaCurso] = useState("");
  const [herramientas, setHerramientas] = useState([]);
  const [targetTools, setTargetTools] = useState();
  const [objetivos, setObjetivos] = useState([]);
  const [idDocente, setIdDocente] = useState('');


  

  const {
    register,
    formState: { errors },
    handleSubmit, reset
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
    axios.post(`http://localhost:5000/api/v1/asistencia`, data)
      .then((response) => {
        Swal.fire(
          'Asistencia registrada',
          'La asistencia ha sido registrada con éxito',
          'success'
        )
      }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar la asistencia, intente nuevamente',
          });
        console.error(error,{
            message: 'Error al registrar la asistencia',
          });
      })
    reset({
      docenteAula: "",
      cursoNivel: "",
      matricula: "",
      asistencia: "",
      herramienta: "",
      objetivo: "",
    });
    setMatriculaCurso('0')
  };

  const getCurso = () => {
    // Fetch API to get the list of curso
    console.log(idDocente)
    fetch(`http://localhost:5000/api/v1/docente/${idDocente}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.curso);
        setCurso(data.curso);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDocente = () => {
   fetch("http://localhost:5000/api/v1/docente")
     .then((response) => response.json())
     .then((data) => {
       console.log(data.allDocente);
       setDocente(data.allDocente);
     });
  };

  const getHerramientas = () => {
    fetch("http://localhost:5000/api/v1/herramienta")
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
    fetch(`http://localhost:5000/api/v1/herramienta/${targetTools}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setObjetivos(data.objetivo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickIdDocente = (evt) => {
    console.log(evt.target.value)
    setIdDocente(evt.target.value);
  };
  
  
  useEffect(() => {
    getDocente();
    getHerramientas();
    getObjetivos();
  }, [targetTools]);

  useEffect(() => {
    getCurso();
    console.log(idDocente)
  }, [idDocente]);
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
              onClick={(e) => {
                const cursoSet = e.target.value;
                const resultCurso = curso.filter((item) => item.nombreCurso === cursoSet);
                setMatriculaCurso(resultCurso[0].matriculaCurso || 0);
              }
            }
              name="cursoNivel"
              {...register("cursoNivel", {
                required: "Seleccione un curso",
              })}
            >
              <option value=" ">Curso</option>
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