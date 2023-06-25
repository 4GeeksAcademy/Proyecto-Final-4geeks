import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/classification.css";
import "../../styles/table.css";
import { Button, ListGroupItem } from "react-bootstrap";

export const Classification = () => {
  useEffect(() => {
    document.title = "BTFX - Clasificación";
  }, []);

  const { store } = useContext(Context);

  const [point, setPoint] = useState({ [store.trials[0].tournament]: true });
  const [event, setEvent] = useState({});
  const [categorie, setCategorie] = useState({});

  const [runners, setRunners] = useState([]);

  useEffect(() => {
    let aux = [];
    store.trials.map((item) => {
      if (
        Object.keys(point)[0] === item.tournament &&
        Object.keys(event).length === 0
      ) {
        item.runners.map((x, xIndex) => {
          const filter = aux.filter((y) => y.name === x.name);
          if (filter.length === 0) {
            aux.push(x);
          } else {
            const index = aux.findIndex((e) => e.name === x.name);
            const points = aux[index].points + x.points;

            aux.splice(index, 1);

            /* ES NECESARIO CREAR UNA REPLICA DEL ITEM X, 
            PORQUE SI NO ESTARÍA MODIFICANDO DIRECTAMENTE LA STORE */
            const replicaX = {};

            for (const i in x) {
              if (i === "points") replicaX[i] = points;
              else replicaX[i] = x[i];
            }
            aux.push(replicaX);
          }
        });
      } else if (
        Object.keys(point)[0] === item.tournament &&
        Object.keys(event)[0] === item.name &&
        Object.keys(event).length > 0
      ) {
        item.runners.map((x) => {
          aux.push(x);
        });
      }
    });

    aux.sort((a, b) => {
      return b.points - a.points;
    });

    setRunners(aux);
    aux = [];
  }, [point, event]);

  return (
    <div className="page-inside-sideband classification">
      <h1>Clasificación</h1>
      <div className="filters">
        <div className="tournaments">
          {store.tournaments.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setEvent({});
                setPoint({ [item]: true });
              }}
              type="button"
              className={
                point[item] ? `btn btn-dark btn-sm` : `btn btn-light btn-sm`
              }
            >
              {item}
            </button>
          ))}
        </div>
        {Object.values(point)[0] ? (
          <>
            <div className="hr"></div>
            <hr />
            <div className="trials">
              {store.trials.map((item, index) => (
                <>
                  {item.tournament === Object.keys(point)[0] && (
                    <button
                      onClick={() => {
                        setCategorie({});
                        setEvent({ [item.name]: true });
                      }}
                      key={index}
                      type="button"
                      className={
                        event[item.name]
                          ? "btn btn-dark btn-sm"
                          : "btn btn-light btn-sm"
                      }
                    >
                      {item.name}
                    </button>
                  )}
                </>
              ))}
            </div>
          </>
        ) : null}

        {Object.values(event)[0] && Object.values(point)[0] ? (
          <>
            <hr />
            <div className="categories">
              {store.trials.map((item) => {
                const arr = [];
                if (item.name === Object.keys(event)[0]) {
                  item.categories.map((item) => {
                    arr.push(item);
                  });
                }
                return (
                  <>
                    {item.name === Object.keys(event)[0]
                      ? arr.map((item, index) => {
                          return (
                            <button
                              onClick={() => setCategorie({ [item]: true })}
                              key={index}
                              type="button"
                              className={
                                categorie[item]
                                  ? "btn btn-dark btn-sm"
                                  : "btn btn-light btn-sm"
                              }
                            >
                              {item}
                            </button>
                          );
                        })
                      : null}
                  </>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th colSpan="3">Año: 2023</th>
            </tr>
          </tfoot>
          <tbody>
            {runners.map((item, index) => {
              return (
                <tr key={index}>
                  <td data-title="Nombre">{item.name}</td>
                  <td data-title="Equipo">{item.team}</td>
                  <td data-title="Puntos">{item.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
