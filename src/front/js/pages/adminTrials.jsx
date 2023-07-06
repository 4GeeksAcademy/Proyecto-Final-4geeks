import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/config.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import tool from "../../img/tool.jpg";

export const AdminTrials = () => {
  useEffect(() => {
    document.title = "BTFX Admin - Pruebas";
  }, []);

  const navigate = useNavigate();

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("Error inesperado.");

  //Redirect in case role its User
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    console.log(role);
    if (role === "User" || role === undefined || role === "Manager") {
      navigate("/");
    } else {
      actions.loadTrials();

      setLoad(true);
    }
  }, [store.user]);

  return (
    <div className="page-inside-wb config pt-5 w-25">
      {load && (
        <>
          <div className="config-wrapper">
            <div style={{ backgroundImage: `url(${tool})` }} className="title">
              <h1>Registrar Eventos</h1>
            </div>
            <div className="body container-fluid">
              {store.eventResults.map((item, index) => (
                <div key={index} className="item row">
                  <p className="col-12 col-md-2">{item.competition.name}</p>
                  <p className="col-12 col-md-2">
                    {item.user.name} {item.user.subname}
                  </p>
                  <p className="col-12 col-md-2">Dorsal : {item.dorsal}</p>
                  <p className="col-12 col-md-2">Tiempo : {item.time}</p>
                  <p className="col-12 col-md-2">Puntos : {item.points}</p>

                  <div className="check col-12 col-md-1 d-flex">
                    <FontAwesomeIcon
                      onClick={() => {}}
                      className="yes"
                      icon={faCheck}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
