import React, { useEffect, useState } from "react";
import "./FormAsistencia.css";

const FormAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [docente, setDocente] = useState([]);
  const [idDocente, setIdDocente] = useState("");
  const [matricula, setMatricula] = useState("");
  const [herramienta, setHerramienta] = useState([]);
  const [herramientaId, setHerramientaId] = useState("");
  const [objetivo, setObjetivo] = useState([]);

  const obtenerDocente = () => {
    fetch("http://localhost:5000/api/v1/docente")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDocente(data.allDocente);
      });
  };

  useEffect(() => {
    obtenerDocente();
  }, []);

  const handleDocenteChange = (e) => {
    const selectedDocenteId = e.target.value;
    setIdDocente(selectedDocenteId);

    // Filtrar los cursos según el docente seleccionado
    const selectedDocente = docente.find(
      (itemDocente) => itemDocente._id === selectedDocenteId
    );

    // Si se encuentra el docente seleccionado, actualizar los cursos
    if (selectedDocente) {
      setCursos(selectedDocente.curso);
    } else {
      setCursos([]);
    }
  };

  const handleCursoChange = (e) => {
    const selectCursoId = e.target.value;
    const selectedMaricula = cursos.find(
      (itemDocente) => itemDocente._id === selectCursoId
    );
    setMatricula(selectedMaricula.matricula);
  };

  const obtenerHerramienta = () => {
    fetch("http://localhost:5000/api/v1/herramienta")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.tools);
        setHerramienta(data.tools);
      });
  };
  useEffect(() => {
    obtenerHerramienta();
  }, []);

  const handleHerramientaChange = (e) => {
    const selectHerramientaId = e.target.value;
    setHerramientaId(selectHerramientaId);
    const selectedHerramienta = herramienta.find(
      (itemHerramienta) => itemHerramienta._id === selectHerramientaId
    );
    setObjetivo(selectedHerramienta.objetivo); // Obtener el objetivo de la herramienta seleccionada
    if (selectedHerramienta) {
      console.log(selectedHerramienta.objetivo);
    } else {
      setObjetivo("");
    } // Obtener el objetivo de la herramienta seleccionada

   
  };

  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>
      <form className="form-asistencia">
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select
            className="selected-item"
            name=""
            id="docente"
            onChange={handleDocenteChange}
          >
            <option value="-1">Docente</option>
            {docente.length > 0 &&
              docente?.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
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
              onChange={handleCursoChange}
            >
              <option value="">Curso</option>
              {cursos?.map((curso, index) => {
                return (
                  <option key={index} value={curso._id}>
                    {curso.nombreCurso}
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
              value={matricula}
            />
          </div>
          <div className="select-item-self">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              name=""
              id="asistencia"
              required
            />
          </div>
        </div>
        <div className="select-group">
          <label htmlFor="herramineta">Herramienta a utilizar</label>
          <select
            className="selected-item"
            name=""
            id="tool"
            onChange={handleHerramientaChange}
          >
            <option value="">Seleccionar Herramienta</option>
            {herramienta?.map((tool) => {
              return (
                <option key={tool._id} value={tool._id}>
                  {tool.nombreTool}
                </option>
              );
            })}
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
            <option value="">Seleccionar Objetivo</option>
            {
              objetivo?.map(obj => {
                return (
                  <option key={obj._id} value={obj._id}>
                    {obj.nombreObjetivo}
                  </option>
                );
              })
            }
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
