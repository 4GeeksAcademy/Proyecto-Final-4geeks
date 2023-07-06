import React,{Fragment,useContext,useState} from 'react'
import "../../styles/filtros.css";

import { Context } from "../store/appContext";
import { Button } from 'react-bootstrap';


export const Filtros = () => {
   
    const { store } = useContext(Context);

    const [torneos,setTorneos] = useState(false)

    const [torneosFill,setTorneosfill] = useState({})

  
    


// function filtrarCategoria(torneo,index) {

//     // const newArray = store.trials.tournament.filter((item) => item.tournament === torneo) 
//     // const newCategorie = newArray.map((item) => item.categories ) 
     
//     // console.log(newCategorie)
// }

// function filtrarFecha(torneo,index) {

//     // const newArray = store.trials.tournament.filter((item) => item.tournament === torneo) 
   
//     // const newCategorie = newArray.map((item) => item.categories ) 
     
//     // console.log(newCategorie)
// }

    return (

        <Fragment>
           
            <div className="row d-flex justify-content-center m-0 p-0">
                
                <div className='col-auto'>
                    <button
                        onClick={() => {  
                            if (!torneos)  {
                            setTorneos(true)                          
                            }else{
                                setTorneos(false)
                            }; 
                        }}
                        type="button"
                        className={torneos ? "btn btn-primary" : "btn btn-secondary"}
                    
                    >  Torneo
                        
                    </button>
                </div>
                
                <div className="row d-flex justify-content-center m-0 p-0">
                    { store.tournaments.map((item,index)=>(
                        <> {torneos ?( 
                        <div className='col-auto' key={index}> 
                        <button
                                onClick={() => {
                                    setTorneosfill({[index]:true} )
                                    console.log({[index]:true})
                                }}
                                type="button"
                                className={torneosFill[index]? "btn btn-primary" : "btn btn-secondary"}
                            
                            >
                            {item}
                        </button>
                    </div>) 
        
                            :null}           
                        </>
                       

                        ))}
                                      
                </div>
            
            </div>
        </Fragment>
)}
