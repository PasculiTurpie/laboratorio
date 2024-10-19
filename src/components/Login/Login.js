import React, { useRef, useState } from "react";
import "./Login.css";

const Login = () => {
  const [inputFocus, setInputFocus] = useState("");

  const nameInput = useRef(null);
  const nameLabel = useRef(null);
  const passInput = useRef(null);
  const passLabel = useRef(null);
  const input = useRef('')



  const listInputs = Array.from(document.querySelectorAll(".form-input"));
  console.log(listInputs)

  const lists = listInputs.map((input) => {
    const id = input.id;
    console.log(`error-input-${id}`)
  })

  const handleSubmit = (e) => {
   e.preventDefault()
 }

 /*  const handleOnChange = (e) => {
    console.log(e.target.validity.valid);
    console.log(`error-input-${id}`);
  } */

  const handleInputNameFocus = () => {
    const nameInputRef = nameInput.current;
    const nameLabelRef = nameLabel.current;
    console.log(nameInputRef.validity.valid);
    nameInputRef.classList.add("focus");
    nameLabelRef.classList.add("focus");
    nameLabelRef.classList.add("top");
  };

  const handleInputNameBlur = () => {
    const nameInputRef = nameInput.current;
    const nameLabelRef = nameLabel.current;
    if (nameInputRef.value === "") {
      nameInputRef.classList.remove("focus");
      nameLabelRef.classList.remove("focus");
      nameLabelRef.classList.remove("top");
    }
  };

  const handleInputPassFocus = () => {
    const passInputRef = passInput.current;
    const passLabelRef = passLabel.current;
    console.log(passInputRef.validity.valid);
    passInputRef.classList.add("focus");
    passLabelRef.classList.add("focus");
    passLabelRef.classList.add("top");
  };

  const handleInputPassBlur = () => {
    const passInputRef = passInput.current;
    const passLabelRef = passLabel.current;
    if (passInputRef.value === "") {
      passInputRef.classList.remove("focus");
      passLabelRef.classList.remove("focus");
      passLabelRef.classList.remove("top");
    }
  };

  return (
    <div className="login">
      <img
        className="login-logo"
        src="http://principedeasturiasvaldivia.cl/Colegio/wp-content/uploads/2020/04/cropped-logo_colegio_completo-2.png"
        alt=""
      />
      <form action="" className="form-login" onSubmit={handleSubmit}>
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
            required
            autoComplete="off"
            minLength={3}
            maxLength={30}
            /* onChange={handleOnChange} */
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
            required
            minLength={8}
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
