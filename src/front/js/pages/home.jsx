import React, { useContext } from "react";
import { Context } from "../store/appContext";

import hero from "../../img/hero.jpg";
import "../../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div
      style={{
        backgroundImage: `url(${hero})`,
      }}
      className="px-4 py-5 my-5 text-center hero"
    >
      <h1 className="display-5 fw-bold">BTFX</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Bienvenido a nuestra plataforma de inscribción de pruebas ciclistas de
          Bizkaia.
        </p>
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center icon">
        <FontAwesomeIcon type="button" icon={faAnglesDown} />
      </div>
    </div>
  );
};
