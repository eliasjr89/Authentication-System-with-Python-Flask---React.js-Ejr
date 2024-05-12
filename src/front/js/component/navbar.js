import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/logoHW.png";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut= () => {
		actions.logOut();
		navigate('/')
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
		 	 {/* <nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<Link to="/"> 
					<a className="navbar-brand" href="#">
					<img className="logo" src={logoImageUrl}/> 
					</a>
					</Link>
					<h2 className="navbar-text mx-2">Friendly Wheels</h2>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
						<Link to="/login">  
						<button className="btn btn-light">Login</button>
						</Link>  
						</li>
					</ul>
					</div>
				</div>
    		</nav> */}
			<div className="container-fluid">
				<div className="d-flex">
					{/* Logo de la empresa */}
					<Link to="/"> 
						<img className="logo" src={logoImageUrl}/> 
					</Link>
					{/* Nombre de la empresa */}
					<div className="align-self-center">
						<h2 className="navbar-text ms-3">Friendly Wheels</h2>
					</div>
				</div>
				{token ?
					<>
						<div className="d-flex">
							<div className="btn-group me-5">
								<button className="btn-lg btn-light">Añadir vehículo</button>
							</div>
							<div className="btn-group me-5">
								<button class="btn btn-light btn-lg dropdown-toggle text-dark align-items-center mx-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favoritos
									<span className="px-2 ms-1 text-success" style={{borderRadius:"30px"}}>{store.favorites.length}</span>
								</button>
								<ul className="dropdown-menu">
									{store.favorites.length === 0 
										? <li className="text-center">(empty)</li>
										: <p>Tengo algo</p>  /* En esta linea iria el map */
									}
								</ul>
							</div>
							<div className="btn-group me-5">
								<button class="btn btn-light btn-lg dropdown-toggle text-dark align-items-center mx-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Tú
									<span className="px-2 ms-1 text-success" style={{borderRadius:"30px"}}>{store.myVehicles.length}</span>
								</button>
								<ul className="dropdown-menu">
									{store.myVehicles.length === 0 
										? <li className="text-center">(empty)</li>
										: <p>Tengo algo</p>  /* En esta linea iria el map */
									}
								</ul>
							</div>
							<div>
								<button className="btn-lg btn-light"onClick={handleLogOut}>Log Out</button>
							</div>
						</div>
					</>
					: (
						<>
							<div className="d-flex">
								<Link to="/login"> 
									<div className="btn-group me-5">	
										<button className="btn-lg btn-light">Login</button>
									</div>
								</Link> 
								<Link to="/signup"> 
									<div className="btn-group me-5">	
										<button className="btn-lg btn-light">Signup</button>
									</div>
								</Link> 
							</div>
						</>
					)
				} 			
      		</div>
   		 </nav>
	);
};
