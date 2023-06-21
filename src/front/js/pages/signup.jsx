import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";

export const Signup = () => {
  useEffect(() => {
    document.title = "BTFX - Registro";
  }, []);

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

  const [dni, setDni] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleFormulary = async (e) => {
    e.preventDefault();

    const data = {
      dni: dni,
      fullName: fullName,
      email: email,
      mobile: mobile,
      password: password,
    };

    const signup = await actions.signup(data);
    if (signup) {
      const login = await actions.login(data);
      if (login) {
        navigate("/");
      }
      navigate("/");
    }
    setAlert(true);
    setAlertText("Error with signup");
  };

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Registro</h1>
              <div className="subtitle-submit d-flex">
                <h6>¿Ya tienes una cuenta?</h6>
                <Link to={`/login`}>Inicia Sesión</Link>
              </div>
            </div>

            <hr />
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
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">DNI*</label>
              <input
                required
                onChange={(e) => setDni(e.target.value)}
                value={dni}
                type="text"
                className="form-control"
                id="dni"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Nombre completo*</label>
              <input
                required
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                className="form-control"
                id="fullname"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Email*</label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="form-control "
                id="email"
                aria-describedby="emailHelp"
                placeholder="example@correo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Número de móvil*</label>
              <input
                required
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="number"
                className="form-control"
                id="mobile"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Contraseña*</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-1">
              <label htmlFor="exampleInputEmail1">Confirmar contraseña*</label>
              <input
                required
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                type="password"
                className="form-control"
                id="password2"
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
