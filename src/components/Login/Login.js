import React from "react";
import "./Login.css";



const Login = () => {


  

  return (
    <>
      <div className="login">
        <img
          className="login-logo"
          src="http://principedeasturiasvaldivia.cl/Colegio/wp-content/uploads/2020/04/cropped-logo_colegio_completo-2.png"
          alt=""
        />
        <form action="" className="form-login">
          <div className="form-group-input">
            <input
              className="form-input"
              type="text"
              name="input-name"
              id="name"
            />
            <span className="error-input error-input-name">Mensaje</span>
          </div>
          <div className="form-group-input">
            <input
              className="form-input"
              type="password"
              name="input-password"
              id="password"
            />
            <span className="error-input error-input-password">Mensaje</span>
          </div>
          <div className="form-group-button">
            <button className="form-button-enviar" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
