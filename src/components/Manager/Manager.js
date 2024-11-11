import React from "react";
import "./Manager.css";
import FormCurso from "../FormCurso/FormCurso";
import FormDocente from "../FormDocente/FormDocente";
import AsignarCursoDocente from "../AsignarCursoDocente/AsignarCursoDocente";

const Manager = () => {
  return (
    <>
      <div className="form-container">
        <div className="div-container">
          <FormCurso />
          <FormDocente />
        </div>
        <div className="div-container">
          <AsignarCursoDocente />

        </div>
      </div>
    </>
  );
};

export default Manager;
