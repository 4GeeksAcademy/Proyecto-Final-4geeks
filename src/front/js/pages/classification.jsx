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
            <tr>
              <td data-title="Provider Name">Iacob Geaorgescu</td>
              <td data-title="E-mail">Equipo 1</td>
              <td className="select">41</td>
            </tr>
            <tr>
              <td data-title="Provider Name">Julius Neumann</td>
              <td data-title="E-mail">Equipo 1</td>
              <td className="select">36</td>
            </tr>
            <tr>
              <td data-title="Provider Name">Christoph Koller</td>
              <td data-title="E-mail">Equipo 2</td>
              <td className="select">30</td>
            </tr>
            <tr>
              <td data-title="Provider Name">Bram Lemmens</td>
              <td data-title="E-mail">Equipo 4</td>
              <td className="select">18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
