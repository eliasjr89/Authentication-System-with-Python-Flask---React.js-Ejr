import React, { useContext } from "react";
import { Context } from "../store/appContext";
import BcgImg from '../../img/fondo.png';
import Form from "../component/form";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div 
			className="d-flex justify-content-center" 
			style={{
				backgroundImage: `url(${BcgImg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				height: "100vh"
			}}
		>
			<div className="align-self-start" style={{ marginTop: '5%' }}>
				<Form />
			</div>
		</div>
	);
};
