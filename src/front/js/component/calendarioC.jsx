import React, { Fragment,useState,useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


import { Context } from "../store/appContext.js";

export const CalendarioC = (props) => {
  const { store, actions } = useContext(Context);


  return (
    <Fragment>

        <div className="card w-75 mb-3 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded ">
          <div className="card-body">

          <div className="container-fluid rounded-5">

                  
              <div className="row border-bottom w-100 rounded-5">
                <h2>
                  {props.name}
                </h2>

                </div>
                
                <div className="row d-block w-100">  
                    <div>
                      <div className="col-auto  fs-5 fst-italic">Fecha:{props.date_celebration} </div>  
                      <div className="col-auto  fs-5 fst-italic">Categoria: {props.categories} </div>
                      <div className="col-auto  fs-5 fst-italic">Ubicación: {props.location}  </div>
                      <div className="col-auto  fs-5 fst-italic">Torneo: {props.torneo} </div> 
                    </div>
                </div>

                   <Link to="#" className="btn btn-primary mt-4 justify-content-center">Participar</Link>
               
              </div>
            

             
           
          

          </div>
        </div>



    </Fragment>
      
    
  )
}




