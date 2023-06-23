import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/classification.css";
import { Button, ListGroupItem } from "react-bootstrap";

export const Classification = () => {
  useEffect(() => {
    document.title = "BTFX - Registro";
  }, []);

  const [point, setPoint] = useState({});
  const [event, setEvent] = useState({});

  const { store } = useContext(Context);
  return (
    <div className="page-inside-sideband classification">
      <h1>Clasificación</h1>
      <div className="filters">
        <div className="tournaments">
          {store.tournaments.map((item, index) => (
            <button
              key={index}
              onClick={() => setPoint({ [item]: !point[item] })}
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
            <hr />
            <div className="trials">
              {store.trials.map((item, index) => (
                <>
                  {item.tournament === Object.keys(point)[0] ? (
                    <button
                      onClick={() =>
                        setEvent({ [item.name]: !event[item.name] })
                      }
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
                  ) : null}
                </>
              ))}
            </div>
          </>
        ) : null}

        {/*  {Object.values(event)[0] ? (
          <>
            <hr />
            <div className="categories">
              {store.trials.map((item) => {
                const arr = [];
                if (item.name === Object.keys(event)[0]) {
                  item.categories.map((item, index) => {
                    arr.push(item);
                  });
                }
                return <button>hi</button>;
              })}
            </div>
          </>
        ) : null} */}
      </div>
    </div>
  );
};
