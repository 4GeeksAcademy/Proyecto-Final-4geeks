import React, { Component, Fragment } from "react";
import "../../styles/index.css";


export const Footer = () => (
	
	<Fragment>
		
		<footer className="footer py-3">
		
			<div className="container p-4">
				<div className="row">
					<div className="col-lg-6 col-md-12 mb-4">
						<h5 className="mb-3 text-dark">Footer content
						</h5>
						
							
					</div>

					<div className="col-lg-3 col-md-6 mb-4">
						<h5 className="mb-3 text-dark">links</h5>
							<ul className="list-unstyled mb-0">
								<li className="mb-1">
								<a href="#!">FAQ</a>
								</li>
							</ul>
					</div>

					<div className="col-lg-3 col-md-6 mb-4">
						<h5 className="mb-1 text-dark">opening hours</h5>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
								molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
								voluptatem veniam, est atque cumque eum delectus sint!
							</p>
					</div>
				</div>
			</div>
		</footer>

		<div className=" sub-footer text-center p-3 fs-5"> © 2023 Copyright:
			<a className="text-dark text-decoration-none" href="#"> 4GeeksAcademy Group 3</a>
		</div>
		


	</Fragment>
);
