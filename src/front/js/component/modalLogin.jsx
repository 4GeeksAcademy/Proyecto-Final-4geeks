import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export const ModalLogin = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setAlert(false);
  }, [firstField, password]);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  const [firstField, setFirstField] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      firstField: firstField,
      password: password,
      remember: remember,
    };

    const resp = await actions.login(loginData);

    if (resp === 200) {
      location.reload();
    }

    if (resp === 401) {
      setAlert(true);
      setAlertText("Dni, email, nombre de usuario o contraseña no encontrado");
      setPassword("");
    }

    if (resp === 400) {
      setAlert(true);
      setAlertText("Error inesperado, porfavor intentelo de nuevo");
      setPassword("");
    }

    if (resp === undefined) {
      setAlert(true);
      setAlertText("CORS policity");
      setPassword("");
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="title d-flex">
              <h5 className="modal-title" id="exampleModalLabel">
                Iniciar Sesión
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="subtitle d-flex">
              <h6>¿No tienes una cuenta? </h6>
              <Link
                to={`/signup`}
                data-bs-dismiss="modal"
                onClick={() => navigate("/signup")}
              >
                Regístrate
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
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
                  <div className="alert-text">{alertText}</div>
                </div>
              ) : null}

              {/* ALERT END*/}
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  DNI, email o nombre de usuario
                </label>
                <input
                  onChange={(e) => {
                    setFirstField(e.target.value);
                  }}
                  value={firstField}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  onChange={(e) => {
                    setRemember(e.target.checked);
                  }}
                  value={remember}
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Recuerdame <Link to={"/"}>¿No puedes acceder?</Link>
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
