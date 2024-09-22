import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import BcgImg from '../../img/fondo.png'; // Asegúrate de importar la imagen
import "../../styles/home.css";

export const PaginaPrivada = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Verificar si el usuario está autenticado al cargar el componente
        const checkAuth = async () => {
            await actions.verifyToken();
        };

        checkAuth();
    }, []); // Se ejecuta solo una vez al montar el componente

    // Redirige a login si el usuario no está autenticado
    if (!store.auth) {
        return <Navigate to="/login" />;
    }

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
            <div className="container text-center text-light">
                <div className="row align-items-start mt-5 text-light">
                    <div className="col"></div>
                    <div className="col">
                        <h1 className="display-4">
                            Si has llegado hasta aquí, quiere decir que aprobé el proyecto!!
                        </h1>
                        <br />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
};
