import React, { useEffect, useState } from "react";
import "./FormAsistencia.css";

const FormAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [docente, setDocente] = useState([]);
  const [idDocente, setIdDocente] = useState("");
  const [matricula, setMatricula] = useState("");
  const [selectCursoId, setSelectCursoId] = useState("");
  const [herramienta, setHerramienta] = useState([]);
  const [herramientaId, setHerramientaId] = useState("");
  const [objetivo, setObjetivo] = useState([]);
  const [objetivoId, setObjetivoId] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner de carga

  const obtenerDocente = () => {
    fetch("http://localhost:5000/api/v1/docente")
      .then((response) => response.json())
      .then((data) => {
        setDocente(data.allDocente);
      });
  };

  useEffect(() => {
    obtenerDocente();
  }, []);

  const handleDocenteChange = (e) => {
    const selectedDocenteId = e.target.value;
    setIdDocente(selectedDocenteId);

    const selectedDocente = docente.find(
      (itemDocente) => itemDocente._id === selectedDocenteId
    );

    if (selectedDocente) {
      setCursos(selectedDocente.curso);
    } else {
      setCursos([]);
    }
  };

  const handleCursoChange = (e) => {
    const selectedCursoId = e.target.value;
    setSelectCursoId(selectedCursoId);

    const selectedCurso = cursos.find((curso) => curso._id === selectedCursoId);
    setMatricula(selectedCurso ? selectedCurso.matricula : "");
  };

  const obtenerHerramienta = () => {
    fetch("http://localhost:5000/api/v1/herramienta")
      .then((response) => response.json())
      .then((data) => {
        setHerramienta(data.tools);
      });
  };

  useEffect(() => {
    obtenerHerramienta();
  }, []);

  const handleHerramientaChange = (e) => {
    const selectedHerramientaId = e.target.value;
    setHerramientaId(selectedHerramientaId);

    const selectedHerramienta = herramienta.find(
      (itemHerramienta) => itemHerramienta._id === selectedHerramientaId
    );
    setObjetivo(selectedHerramienta ? selectedHerramienta.objetivo : []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !idDocente ||
      !selectCursoId ||
      !herramientaId ||
      !asistencia ||
      asistencia <= 0
    ) {
      setMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    setIsLoading(true); // Activar el spinner

    fetch("http://localhost:5000/api/v1/asistencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docenteId: idDocente,
        cursoId: selectCursoId,
        matricula: matricula,
        asistencia: asistencia,
        herramientaId: herramientaId,
        objetivo: objetivoId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error al enviar la asistencia. Verifica la conexión."
          );
        }
        return response.json();
      })
      .then((data) => {
        setMessage("Asistencia enviada con éxito.");
        setAsistencia("");
        setIdDocente("");
        setSelectCursoId("");
        setHerramientaId("");
        setObjetivo([]);
      })
      .catch((error) => {
        setMessage(
          error.message || "Error inesperado al enviar la asistencia."
        );
      })
      .finally(() => {
        setIsLoading(false); // Desactivar el spinner
      });
  };

  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>
      {message && <p className="message">{message}</p>}
     {isLoading && <div className="spinner"></div>}
      <form className="form-asistencia" onSubmit={handleSubmit}>
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select
            className="selected-item"
            id="docente"
            onChange={handleDocenteChange}
            value={idDocente}
            
          >
            <option value="">Seleccionar Docente</option>
            {docente.map((item) => (
              <option key={item._id} value={item._id}>
                {`${item.nombreDocente} ${item.apellidoDocente}`}
              </option>
            ))}
          </select>
        </div>

        <div className="group-selected">
          <div className="select-item-self">
            <label htmlFor="curso">Curso</label>
            <select
              className="group-selected-item selected-item"
              id="curso"
              onChange={handleCursoChange}
              value={selectCursoId}
              
            >
              <option value="">Seleccionar Curso</option>
              {cursos.map((curso) => (
                <option key={curso._id} value={curso._id}>
                  {curso.nombreCurso}
                </option>
              ))}
            </select>
          </div>

          <div className="select-item-self">
            <label htmlFor="matricula">Matricula</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              id="matricula"
              value={matricula}
              readOnly
            />
          </div>

          <div className="select-item-self">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              id="asistencia"
              value={asistencia}
              onChange={(e) => setAsistencia(e.target.value)}
              
              min="1"
            />
          </div>
        </div>

        <div className="select-group">
          <label htmlFor="herramienta">Herramienta a utilizar</label>
          <select
            className="selected-item"
            id="herramienta"
            onChange={handleHerramientaChange}
            value={herramientaId}
            
          >
            <option value="">Seleccionar Herramienta</option>
            {herramienta.map((tool) => (
              <option key={tool._id} value={tool._id}>
                {tool.nombreTool}
              </option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label htmlFor="objetivo">Objetivos a cumplir</label>
          <select className="selected-item" id="objetivo" >
            <option value="">Seleccionar Objetivo</option>
            {objetivo.map((obj) => (
              <option key={obj._id} value={obj._id}>
                {obj.nombreObjetivo}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button className="btn-enviar" type="submit" disabled={isLoading}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAsistencia;
