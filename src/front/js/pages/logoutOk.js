import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
// import BcgImg from '../../img/fondo.png';
import "../../styles/home.css";

export const LogoutPage = () => {
    const { store, actions } = useContext(Context);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            setRedirect(true);
        }, 3000);

        return () => clearTimeout(redirectTimeout);
    }, []);

    return (
        <>
            {redirect ? <Navigate to="/" /> : null}
            <div 
                className="d-flex justify-content-center align-items-center"
                style={{
                    // backgroundImage: `url(${BcgImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    color: "#000000",
                    textShadow: "0 10px 10px rgba(0, 0, 0, 0.9)"
                }}
            >
                <div className="container text-center">
                    <div className="row align-items-start mt-3"> {/* Cambié mt-5 a mt-3 */}
                        <div className="col"></div>
                        <div className="col-12 col-md-10">
                            <h2 className="display-6 fw-bold">Has cerrado sesión</h2>
                            <h5 className="mb-4">Redirigiendo a la página de inicio de sesión...</h5>
                            <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </>
    );
};
