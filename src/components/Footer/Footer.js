import React from "react";
import "./Footer.css";

const Footer = () => {
  const to_day = new Date();
  const year = to_day.getFullYear();

  return (
    <div className="footer">
      <p>
        {" "}
        <p>
          &copy; {year} Desarrollado por Jorge R. Sepúlveda Turpie. Todos los
          derechos reservados.
        </p>
      </p>
    </div>
  );
};

export default Footer;
