import React from "react";
import "./FormAsistencia.css";

const FormAsistencia = () => {
  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>
      <form className="form-asistencia">
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select className="selected-item" name="" id="docente">
            <option value="">Docente</option>
            <option value="">LESLIE SILVANA MARTINEZ PINO</option>
            <option value="">CAROLINA ANDREA ELLWANGER VELIZ</option>
            <option value="">ALEJANDRA BEATRIZ GONZÁLEZ GALLARDO</option>
            <option value="">PATRICIA EUGENIA ESCAREZ PAZ</option>
            <option value="">RENATA VALENTINA MONSERRAT JARAMILLO MUÑOZ</option>
            <option value="">VICTORIA FRANCISCA MENA VERA</option>
            <option value="">JAVIERA FERNANDA KOPP ZÀRATE</option>
            <option value="">ROXANA ANDREA OPORTO AICHELE</option>
            <option value="">LILIAN DEL CARMEN MARTINEZ MORALES</option>
            <option value="">CRISTOBAL FRANCISCO SANTIBAÑEZ LEHNEBACH</option>
            <option value="">JUANA RETAMAL JIMENEZ</option>
            <option value="">CHRISTOPHER MAURICIO WISTUBA GALAZ</option>
            <option value="">CAROLA HERNA PERALTA MUÑOZ</option>
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
              <option value="">NT1-A</option>
              <option value="">NT1-B</option>
              <option value="">NT2-A</option>
              <option value="">NT2-B</option>
              <option value="">Primero-A</option>
              <option value="">Primero-B</option>
              <option value="">Segundo-A</option>
              <option value="">Segundo-B</option>
              <option value="">Tercero-A</option>
              <option value="">Tercero-B</option>
              <option value="">Cuarto-A</option>
              <option value="">Cuarto-B</option>
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
