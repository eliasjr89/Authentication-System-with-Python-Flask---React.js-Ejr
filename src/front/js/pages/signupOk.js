import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const SignupOk = () => {
    const { store } = useContext(Context);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            // Solo redirigir si el usuario está autenticado
            if (store.auth) {
                setRedirect(true);
            }
        }, 3000);

        return () => clearTimeout(redirectTimeout);
    }, [store.auth]); // Agregar store.auth como dependencia

    return (
        <>
            {redirect && <Navigate to="/paginaprivada" />}

            <div 
                className="d-flex justify-content-center align-items-center" 
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    color: "#ecf0f1",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
                }}
            >
                <div className="card shadow-lg p-4" style={{ width: '90%', maxWidth: '500px' }}>
                    <h2 className="text-center">Registro realizado correctamente</h2>
                    <h5 className="text-center">Redirigiendo a la página principal...</h5>
                    <br />
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
