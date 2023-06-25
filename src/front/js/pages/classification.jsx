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

  const [point, setPoint] = useState({});
  const [event, setEvent] = useState({});
  const [categorie, setCategorie] = useState({});

  const [runners, setRunners] = useState([]);
  const [c, setC] = useState(false);

  useEffect(() => {
    let arr = [];
    store.trials.map((item, index) => {
      if (Object.keys(point)[0] === item.tournament) {
        item.runners.map((x) => {
          const filter = arr.filter((y) => y.name === x.name);
          if (filter.length === 0) {
            arr.push(x);
          } else {
            arr.map((z) => {
              if (z.name === x.name && !c) {
                const runner = z;
                const points = z.points + x.points;

                runner.points = points;
                setC(true);
                return runner;
              } else return z;
            });
          }
        });
      }
    });

    setRunners(arr);
    console.log(arr);

    arr = [];
  }, [point]);

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
            {store.trials.map((item, index) => {
              return (
                <tr>
                  <td data-title="Nombre">Iacob Geaorgescu</td>
                  <td data-title="Equipo">Equipo 1</td>
                  <td data-title="Puntos">41</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
