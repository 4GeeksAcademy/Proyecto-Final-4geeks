import React,{Fragment,useContext,useState} from 'react'
import "../../styles/filtros.css";

import { Context } from "../store/appContext";
import { Button } from 'react-bootstrap';


export const Filtros = () => {
   
    const { store } = useContext(Context);
    const [torneos,setTorneos] = useState(false)

    


    // function filtrarTorneo() {
    //     const torneosB = store.tournaments;
    //      torneosB.map((item) => (
    //       <button >{item}</button>
    //     ));
    //     return;
    //   }

function filtrarCategoria(torneo,index) {

    // const newArray = store.trials.tournament.filter((item) => item.tournament === torneo) 
    // const newCategorie = newArray.map((item) => item.categories ) 
     
    // console.log(newCategorie)
}

function filtrarFecha(torneo,index) {

    // const newArray = store.trials.tournament.filter((item) => item.tournament === torneo) 
   
    // const newCategorie = newArray.map((item) => item.categories ) 
     
    // console.log(newCategorie)
}

    return (

        <Fragment>
           
            <div className="row d-flex justify-content-center m-0 p-0">
                
                <div className='col-auto'>
                    <button
                        
                        type="button"
                        className='filterss'
                    
                    >  Torneo
                        
                    </button>
                </div>
                
                <div className='col-auto'>
                    <button
                        // onClick={() => { filtrarCategoria()  }}
                        type="button"
                        className='filterss'
                    
                    >  Categoría
                        
                    </button>
                </div>
                
                <div className='col-auto'>
                    <button
                        // onClick={() => { filtrarFecha()  }}
                        type="button"
                        className='filterss'
                    
                    >  Fecha
                        
                    </button>
                </div>

                <div className='col-auto'>
                    {filtrarTorneo()}
                </div>    

            </div>
        </Fragment>
)}
