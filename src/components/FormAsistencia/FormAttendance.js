import React from 'react'
import "./FormAttendance.css";
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";


const FormAttendance = () => {

  const validationSchema = Yup.object().shape(
    Yup.object().shape({
      docente: Yup.string().required("Debe seleccionar un docente"),
      curso: Yup.string().required("Debe seleccionar un curso"),
      matricula: Yup.string().required("Debe ingresar una matricula"),
      asistencia: Yup.string().required("Debe Ingresar la asistencia"),
      herramienta: Yup.string().required("Debe seleccionar una herramienta"),
      objetivo: Yup.string().required("Debe seleccionar un objetivo"),
    })
  );

  const formik = useFormik({
    initialValues: {
      docente: '',
      curso: '',
      matricula: '',
      asistencia: '',
      herramienta: '',
      objetivo: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },

  });
  return (
    <div className="container-form">
      <h2>Formulario de Asistencia</h2>

      <form className="form-asistencia" onSubmit={formik.handleSubmit}>
        <div className="select-group">
          <label htmlFor="docente">Docente</label>
          <select
            className="selected-item"
            id="docente"
            onChange={formik.handleChange}
            value={formik.values.docente}
            name="docente"
          >
            <option value="">Seleccionar Docente</option>
            <option value="Jorge">Jorge</option>
          </select>
        </div>

        <div className="group-selected">
          <div className="select-item-self">
            <label htmlFor="curso">Curso</label>
            <select
              className="group-selected-item selected-item"
              id="curso"
              onChange={formik.handleChange}
              value={formik.values.curso}
            >
              <option value="">Seleccionar Curso</option>
              <option value="primero-A">Primero-A</option>
            </select>
          </div>

          <div className="select-item-self">
            <label htmlFor="matricula">Matricula</label>
            <TextField
              id="outlined-basic"
              className="group-selected-item selected-item"
              variant="outlined"
              type="number"
            />
            
          </div>

          <div className="select-item-self">
            <label htmlFor="asistencia">Asistencia</label>
            <input
              className="group-selected-item selected-item"
              type="number"
              id="asistencia"
              onChange={formik.handleChange}
              value={formik.values.asistencia}
              min="1"
            />
          </div>
        </div>

        <div className="select-group">
          <label htmlFor="herramienta">Herramienta a utilizar</label>
          <select
            className="selected-item"
            id="herramienta"
            onChange={formik.handleChange}
            value={formik.values.herramienta}
          >
            <option value="">Seleccionar Herramienta</option>
            <option value="mi ptimer bartolo">Mi primer bartolo</option>
          </select>
        </div>

        <div className="select-group">
          <label htmlFor="objetivo">Objetivos a cumplir</label>
          <select
            className="selected-item"
            id="objetivo"
            onChange={formik.handleChange}
            value={formik.values.objetivo}
          >
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
}

export default FormAttendance