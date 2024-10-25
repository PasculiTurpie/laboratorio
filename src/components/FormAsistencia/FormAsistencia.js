import React, { useEffect, useState } from "react";
import "./FormAsistencia.css";

const FormAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [docente, setDocente] = useState([])

const obtenerDocente = () => {
  fetch("http://localhost:5000/api/v1/docente")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setDocente(data.allDocente);
    });
};

  const obtenerCurso = () => {
    fetch("http://localhost:5000/api/v1/curso")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCursos(data.curso);
      });
  };

  useEffect(() => {
    obtenerCurso();
    obtenerDocente();
  }, []);

  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>
      <form className="form-asistencia">
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select className="selected-item" name="" id="docente">
            <option value="">Docente</option>
            {docente.length > 0 &&
              docente?.map((item) => {
                return (
                  <option key={item._id} value={item.nombreDocente}>
                    {`${item.nombreDocente} ${item.apellidoDocente}`}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="group-selected">
          <div className="select-item-self">
            <label htmlFor="curso">Curso</label>
            <select
              className="group-selected-item selected-item"
              name=""
              id="curso"
            >
              <option value="">Curso</option>
              {cursos.length > 0 &&
                cursos?.map((item, index) => {
                  return (
                    <option key={index} value={item.nombreCurso}>
                      {item.nombreCurso}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="select-item-self">
            <label htmlFor="matricula">Matricula</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              name=""
              id="matricula"
            />
          </div>
          <div className="select-item-self">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              name=""
              id="asistencia"
            />
          </div>
        </div>
        <div className="select-group">
          <label htmlFor="herramineta">Herramienta a utilizar</label>
          <select
            className="selected-item"
            type="text"
            name=""
            id="herramineta"
          >
            <option value="">Mi Primer Bartolo</option>
            <option value="">Aprendiendo a leer con Bartolo</option>
            <option value="">Mi primer Bartolo matemáticas</option>
            <option value="">E-MAT (Compumat)</option>
          </select>
        </div>
        <div className="select-group">
          <label htmlFor="herramineta">Objetivos a cumplir</label>
          <select
            className="selected-item"
            type="text"
            name=""
            id="herramineta"
          >
            <option value="">Mi Primer Bartolo</option>
            <option value="">Aprendiendo a leer con Bartolo</option>
            <option value="">Mi primer Bartolo matemáticas</option>
            <option value="">E-MAT (Compumat)</option>
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

export default FormAsistencia;
