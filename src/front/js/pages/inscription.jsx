import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../styles/signup.css";
import { number } from "prop-types";

export const Inscription = () => {
  useEffect(() => {
    document.title = "BTFX - Inscripción";
  }, []);

  const navigate = useNavigate();
  //Redirect in case user is logged
 

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  const [uciId, setUciId] = useState(null);
  const [fechaN, setFechaN] = useState("");
  const [licencia, setLicencia] = useState(0);
  const [federado, setFederado] = useState("");
  const [sexoUser, setSexoUser] = useState("");



  const handleFormulary = async (e) => {
    e.preventDefault();

    const data = {
      uciId: uciId,
      fechaN: fechaN,
      licencia: licencia,
      federado: federado,
      sexoUser: sexoUser
    };
console.log(data)
    const resp = await actions.Inscription(data);
    // if (resp === 200) {
    //   navigate("/");
    // }

    // if (resp === 401) {
    //   setAlert(true);
    //   setAlertText("Dni, email, nombre de usuario o contraseña no encontrado");
    //   setPassword("");
    // }

    // if (resp === 400) {
    //   setAlert(true);
    //   setAlertText("Error inesperado, porfavor intentelo de nuevo");
    //   setPassword("");
    // }

    // if (resp === undefined) {
    //   setAlert(true);
    //   setAlertText("Bloqued by CORS policy");
    //   setPassword("");
    // }
  };

  return (
    <div className="page-inside-wb wrapper-formulary pt-5 w-25">
      <>
        <div className="form">
          <form onSubmit={handleFormulary}>
            <div className="header-submit">
              <h1>Iniciar Sesión</h1>
              <div className="subtitle-submit d-flex">
                <h6>¿No tienes una cuenta?</h6>
                <Link to={`/signup`}>Regístrate</Link>
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

              <label >
                Uci Id
              </label>

              <input
                required
                onChange={(e) => {
                  setUciId(e.target.value);
                 
                }}
                value={uciId}
                type="number"
                className="form-control"
                id="uciId"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group mb-1">

              <label >Licencia</label>

              <input
                required
                onChange={(e) => {
                  setLicencia(e.target.value);
                }}
                value={licencia}
                type="number"
                className="form-control"
                id="licencia"
               

              />
            </div>
            
            <div className="form-group mb-1">

              <label >Fecha</label>

              <input
                required
                onChange={(e) => {
                  setFechaN(e.target.value);
                }}
                value={fechaN}
                type="date"
                className="form-control"
                id="fechaNacimiento"
                

              />
            </div>
            
            <div className="form-group mb-1">

              <label >Federado</label>

                    <select         
                      name="select"
                      defaultValue={"default"}
                      className="form-control"
                      onChange={(e) => {
                        setFederado(e.target.value);
                      }}
                      value={federado}
                      required
                    >
                          <option value="">
                          
                          </option>

                          <option value="si">
                            si
                          </option>

                          <option value="no">
                            No
                          </option>

                    </select>
            </div>
            
            <div className="form-group mb-1">

              <label >Genero</label>


                    <select         
                      name="select"
                      defaultValue={"default"}
                      className="form-control"
                      required
                      onChange={(e) => {
                        setSexoUser(e.target.value);
                      }}
                      value={sexoUser}
                      id="genero"
                    >
                          <option value="">
                            
                          </option>

                          <option value="masculino">
                            Masculino
                          </option>

                          <option value="femenino">
                            Femenino
                          </option>
                    </select>
            </div>
            
            <div className="footer-submit">
              <button type="submit" className={`btn btn-success`}>
                Continuar
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};
