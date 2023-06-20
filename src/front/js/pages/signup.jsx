import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [load, setLoad] = useState(false);
  //Redirect in case user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
    setLoad(true);
  }, []);

  const handleFormulary = async (e) => {
    e.preventDefault();

    const contactData = {};

    const signup = await actions.signup(contactData);
    if (signup) {
      const login = await actions.login(contactData);
      if (login) {
        navigate("/");
      }
    }
    setAlert(true);
    setAlertText("Error with signup");
  };

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  return (
    <div className="wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          {/* ALERT */}
          {alert ? (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#fa0000" }}
              />
              <div>{alertText}</div>
            </div>
          ) : null}

          {/* ALERT END*/}
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Registro</h1>
              <div className="subtitle-submit d-flex">
                <h6>¿Ya tienes una cuenta?</h6>
                <Link to={`/`}>Inicia Sesión</Link>
              </div>
            </div>

            <hr />
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Nombre completo</label>
              <input
                onChange={(e) => e}
                value={""}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                onChange={(e) => e}
                value={""}
                type="text"
                className="form-control "
                id="firstname"
                aria-describedby="emailHelp"
                placeholder="example@correo.com"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Contraseña</label>
              <input
                onChange={(e) => e}
                value={""}
                type="text"
                className="form-control"
                id="lastname"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Confirmar contraseña</label>
              <input
                onChange={(e) => e}
                value={""}
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Número de móvil</label>
              <input
                onChange={(e) => e}
                onBlur={(e) => {
                  e;
                }}
                value={""}
                type="password"
                className="form-control"
                id="passwordTwo"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">DNI</label>
              <input
                onChange={(e) => e}
                onBlur={(e) => {
                  e;
                }}
                value={""}
                type="password"
                className="form-control"
                id="passwordTwo"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="footer-submit">
              <button type="submit" className={`btn btn-success`}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};
