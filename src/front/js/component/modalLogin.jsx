import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/modal.css";

export const ModalLogin = () => {
  const { actions } = useContext(Context);

  const [firstField, setFirstField] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      firstField: firstField,
      password: password,
    };

    actions.login(loginData);
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
              <Link to={`/signup`}>Regístrate</Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  DNI, email o número de móvil
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
