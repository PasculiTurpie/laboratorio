import React, { useRef, useState } from "react";
import "./Login.css";

const Login = () => {
  const [inputFocus, setInputFocus] = useState("");

  const nameInput = useRef(null);
  const nameLabel = useRef(null);
  const passInput = useRef(null);
  const passLabel = useRef(null);


  const handleInputNameFocus = () => {
    const nameInputRef = nameInput.current;
    const nameLabelRef = nameLabel.current;
    nameInputRef.classList.add("focus");
    nameLabelRef.classList.add("focus");
    nameLabelRef.classList.add("top");
  };

  const handleInputNameBlur = () => {
    const nameInputRef = nameInput.current;
    const nameLabelRef = nameLabel.current;
    nameInputRef.classList.remove("focus");
    nameLabelRef.classList.remove("focus");
    nameLabelRef.classList.remove("top");
  };

const handleInputPassFocus = () => {
  const passInputRef = passInput.current;
  const passLabelRef = passLabel.current;
  passInputRef.classList.add("focus");
  passLabelRef.classList.add("focus");
  passLabelRef.classList.add("top");
};

const handleInputPassBlur = () => {
  const passInputRef = passInput.current;
  const passLabelRef = passLabel.current;
  passInputRef.classList.remove("focus");
  passLabelRef.classList.remove("focus");
  passLabelRef.classList.remove("top");
};

  return (
    <div className="login">
      <img
        className="login-logo"
        src="http://principedeasturiasvaldivia.cl/Colegio/wp-content/uploads/2020/04/cropped-logo_colegio_completo-2.png"
        alt=""
      />
      <form action="" className="form-login">
        <div className="form-group-input">
          <span className="form-label" ref={nameLabel}>
            Nombre
          </span>
          <input
            className="form-input"
            type="text"
            name="input-name"
            id="name"
            ref={nameInput}
            onFocus={handleInputNameFocus}
            onBlur={handleInputNameBlur}
          />
          <span className="error-input error-input-name">Mensaje</span>
        </div>
        <div className="form-group-input">
          <span className="form-label" ref={passLabel}>
            Password
          </span>
          <input
            className="form-input"
            type="password"
            name="input-password"
            id="password"
            ref={passInput}
            onFocus={handleInputPassFocus}
            onBlur={handleInputPassBlur}
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
  );
};

export default Login;
