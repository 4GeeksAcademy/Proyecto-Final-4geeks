import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";

export const Navbar = () => {
  const [logged, setLogged] = useState(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Icon
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscador"
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Calendario
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Inscripción
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Clasificación
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Noticias
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Tienda
              </a>
            </li>
            {logged ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuario
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Perfil
                    </a>
                  </li>
                  <hr className="dropdown-divider" />
                  <li>
                    <a className="dropdown-item" href="#">
                      Seguimientos
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Carrito
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Iniciar Registro
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
