import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";



const Login = () => {
const { register, formState:{errors}, handleSubmit} = useForm();
  

 const onSubmit = (data) => {
  console.log(data);
 }

  return (
    <>
      <div className="login">
        <img
          className="login-logo"
          src="http://principedeasturiasvaldivia.cl/Colegio/wp-content/uploads/2020/04/cropped-logo_colegio_completo-2.png"
          alt=""
        />
        <form
          action=""
          className="form-login"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group-input">
            <input
              className="form-input"
              type="text"
              name="name"
              {...register("name", {
                required: "El campo es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            <span>
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </span>
          </div>
          <div className="form-group-input">
            <input
              className="form-input"
              type="password"
              name="password"
              {...register("password", {
                required: "El campo es obligatorio",
                minLength: {
                  value: 8,
                  message: "Debe tener al menos 8 caracteres",
                },
              })}
            />
            <span>
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </span>
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
