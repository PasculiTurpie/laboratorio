import React, { useEffect, useState } from "react";
import "./FormAttendance.css";
import * as Yup from "yup";
import axios from "axios";

const FormAttendance = () => {
  const [curso, setCurso] = useState([]);
  const [docente, setDocente] = useState([]);

  const getCurso = () => {
    // Fetch API to get the list of curso
    axios
      .get("http://localhost:5000/api/v1/curso")
      .then((response) => {
        setCurso(response.data);
        console.log(response);
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
      console.log(response.data.allDocente);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(() => {
    getDocente();
    getCurso();
  }, []);
  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>

      <form className="form-asistencia">
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select className="selected-item" name="docente">
            <option value="">Docente</option>
            {docente.map((docente) => (
              <option key={docente.id} value={docente.id}>
                {docente.nombreDocente.toUpperCase()}{" "}
                {docente.apellidoDocente.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="group-selected">
          <div className="select-item-number">
            <label htmlFor="curso">Curso</label>
            <select className="group-selected-item selected-item" name="curso">
              <option value=""> Curso</option>
              {curso?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nombreCurso.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="select-item-self select-item-number">
            <label htmlFor="matricula">Matricula</label>
            <input
              name="matricula"
              className="group-selected-item selected-item group-selected"
              type="number"
            />
          </div>

          <div className="select-item-self select-item-number">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              name="asistencia"
              min="1"
            />
          </div>
        </div>

        <div className="select-group">
          <label htmlFor="herramienta">Herramienta a utilizar</label>
          <select className="selected-item" name="herramienta">
            <option value="">Seleccionar Herramienta</option>
            <option value="mi ptimer bartolo">Mi primer bartolo</option>
          </select>
        </div>

        <div className="select-group">
          <label htmlFor="objetivo">Objetivos a cumplir</label>
          <select className="selected-item" name="objetivo">
            <option value="">Seleccionar Objetivo</option>
            <option value="Apresto a la lectoescritura">
              Apresto a la lectoescritura
            </option>
          </select>
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
