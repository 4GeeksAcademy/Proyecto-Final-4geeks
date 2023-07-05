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

export const ManagerInscription = () => {
  useEffect(() => {
    document.title = "BTFX Manager - Inscripciones";
  }, []);

  const navigate = useNavigate();
  const dorsalInput = useRef();

  const { store, actions } = useContext(Context);
  const [load, setLoad] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("Error inesperado.");

  //Redirect in case role its User
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("user")).role;
    console.log(role);
    if (role === "User" || role === undefined) {
      navigate("/");
    } else {
      actions.loadInscriptions();

      setLoad(true);
    }
  }, [store.user]);

  const [dorsal, setDorsal] = useState({});

  const userValidation = (userId, competitionId, dorsal) => {
    console.log(dorsalInput.current);

    const data = {
      user: userId,
      competition: competitionId,
      dorsal: dorsal,
    };

    console.log(data);
  };

  return (
    <div className="page-inside-wb config pt-5 w-25">
      {load && (
        <>
          <div className="config-wrapper">
            <div style={{ backgroundImage: `url(${tool})` }} className="title">
              <h1>Inscripciones</h1>
            </div>
            <div className="body container-fluid">
              {store.inscriptions.map((item, index) => (
                <div key={index} className="item row">
                  <p className="col-12 col-md-2">
                    {item.user.name} {item.user.subname}
                  </p>
                  <p className="col-12 col-md-2">{item.competition.name}</p>
                  <p className="col-12 col-md-3">
                    {item.user.category === null ? (
                      <>
                        Categoría:
                        <select
                          defaultValue={"value1"}
                          style={{ width: "8em" }}
                          name="select"
                        >
                          <option value="value1"></option>
                          {store.categories?.map((x, y) => (
                            <option key={y} value="value1">
                              {x.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        Categoría:
                        <select
                          style={{ width: "8em" }}
                          name="select"
                          defaultValue={"value1"}
                        >
                          <option value="value1">
                            {item.user.category.name}
                          </option>
                          {store.categories?.map((x, y) => (
                            <>
                              {x.name !== item.user.category.name && (
                                <option key={y} value={y}>
                                  {x.name}
                                </option>
                              )}
                            </>
                          ))}
                        </select>
                      </>
                    )}
                  </p>
                  <p className="col-12 col-md-2">
                    {item.user.team === null ? (
                      <>
                        Equipo:
                        <select
                          defaultValue={"value1"}
                          style={{ width: "6em" }}
                          name="select"
                        >
                          <option value="value1"></option>
                          {store.teams?.map((x, y) => (
                            <option key={y} value="value1">
                              {x.name}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        Equipo:
                        <select
                          style={{ width: "6em" }}
                          name="select"
                          defaultValue={"value1"}
                        >
                          <option value="value1">{item.user.team.name}</option>
                          {store.teams?.map((x, y) => {
                            {
                              x.name !== item.user.team.name && (
                                <option key={y} value={y}>
                                  {x.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </>
                    )}
                  </p>

                  <p className="col-12 col-md-2">
                    {" "}
                    Dorsal:{" "}
                    <select
                      style={{ width: "4em" }}
                      name="select"
                      defaultValue={"value1"}
                    >
                      <option value="value1"></option>
                      {[...Array(item.competition.participation_limit)].map(
                        (x, y) => {
                          const aux = [];
                          store.eventResults.map((a, b) => {
                            if (a.competition.id === item.competition.id) {
                              aux.push(a.dorsal);
                            }
                          });

                          return (
                            <>
                              {!aux.includes(y + 1) && (
                                <option key={y} value={y}>
                                  {y + 1}
                                </option>
                              )}
                            </>
                          );
                        }
                      )}
                    </select>
                    {/* <input
                      ref={dorsalInput}
                      onChange={(e) => {
                        setDorsal({ ...dorsal, [index]: e.target.value });
                      }}
                      value={dorsal[index]}
                      type="number"
                    />  */}
                  </p>
                  <div className="check col-12 col-md-1 d-flex">
                    <FontAwesomeIcon
                      type="submit"
                      onClick={() => {
                        userValidation(
                          item.user.id,
                          item.competition.id,
                          dorsal[index]
                        );
                      }}
                      className="yes"
                      icon={faCheck}
                    />
                    <FontAwesomeIcon
                      type="submit"
                      className="no"
                      icon={faXmark}
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
