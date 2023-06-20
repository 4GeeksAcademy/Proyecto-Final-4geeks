import React, { Component, Fragment } from "react";
import "../../styles/footer.css";
import Log1 from "../../img/Logo1.1.png";
import Log2 from "../../img/logo2.png";
import Log3 from "../../img/logo3.png";



export const Footer = () => (
	
	<Fragment>
								{/*  */}
				
		
		<footer className="footer py-2  ">
			<div className="container-fluid position-relative  ">

					<div className="row ml-3 justify-content-between ">
											
						
							<div className="col-md-4 ">
								<h2 className="fs-4">Contacto:</h2>
									<p className="fs-6">Martín Barúa Picaza Kalea, 27, 48003 Bilbo, Bizkaia</p>
								<div className="fs-4 d-flex gap-4">
									<a href="#"><i className="fab fa-facebook-f text-primary zoom-social "></i></a>
									<a href="#"><i className="fab fa-twitter text-info zoom-social"></i></a>
									<a href="#"><i className="fab fa-instagram text-danger zoom-social"></i></a>
									<a href="#"><i className="fab fa-linkedin-in text-secondary zoom-social"></i></a>
								</div>
							</div>


							<div className="container col-md-4 text-center ">
								<div className="">
									<img id="Bizk" src={Log1} alt="imagen federación Bizkaina" className="z-n1 position-relative img-fluid " />
								</div>
							</div>


							<div className="col-md-4 mb-4">

									<ul className="navbar-nav me-auto mb-2 mb-lg-0 text-decoration-none  fs-5 ">
									<div className="row ">

									
										<div className="col-6 d-inline">
											<li className="nav-item ">
											<a className="nav-link enlaces " aria-current="page" href="#">
												Calendario
											</a>
											</li>
											<li className="nav-item">
											<a className="nav-link enlaces " aria-current="page" href="#">
												Inscripción
											</a>
											</li>
										</div>

										<div className="col-6 d-inline ">
											<li className="nav-item ">
											<a className="nav-link enlaces" aria-current="page" href="#">
												Clasificación
											</a>
											</li>
											<li className="nav-item">
											<a className="nav-link enlaces" aria-current="page" href="#">
												Noticias
											</a>
											</li>

										</div>
									</div>
									</ul>
										<div className="row  g-2  ">
											<li className="col-6  alinear mx-5  ">
												<img src={Log2} alt="" className="img-fluid position-relative z-n1 d-inline opacity-75 "/>
											</li>
											<li className="col-6 alinear ">
												<img src={Log3} alt="" className="img-fluid position-relative z-n1 d-inline opacity-75"/>
											</li>
										</div>
							</div>
												
			</div>
			</div>
		</footer>

		<div className=" container-fluid sub-footer text-center p-1 fs-6"> 
			<p className="fst-italic text-dark">© 2023 Copyright. All rights reserved. 
			<a className="text-dark text-decoration-none" href="#"> 4GeeksAcademy Group 3</a></p> 
		</div>
		

	</Fragment>
);
