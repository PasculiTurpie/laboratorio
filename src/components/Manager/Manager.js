import React from "react";
import "./Manager.css";
import FormCurso from "../FormCurso/FormCurso";
import FormDocente from "../FormDocente/FormDocente";


const Manager = () => {
  

  return (
    <>
      <div className="form-container">
        <FormCurso />
        <FormDocente />
      </div>
    </>
  );
};

export default Manager;
