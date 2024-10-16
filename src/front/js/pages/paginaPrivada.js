import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/index.css";

export const PaginaPrivada = () => {
    const { store, actions } = useContext(Context);
    const [isChecking, setIsChecking] = useState(true); // Estado para controlar la verificación

    useEffect(() => {
        const checkAuth = async () => {
            await actions.verifyToken(); // Verifica el token
            setIsChecking(false); // Cambia el estado después de la verificación
        };

        checkAuth();
    }, [actions]); 
    if (isChecking) {
        return <div className="text-center">Cargando...</div>;
    }

    if (!store.auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center mt-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-10 offset-md-1">
                        <h1 className="display-4 fw-bold">
                            ¡Bienvenido a la página privada!
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
