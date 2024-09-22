import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import BcgImg from '../../img/fondo.png'; // Asegúrate de importar la imagen
import "../../styles/home.css";

export const LoginOk = () => {
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
            {redirect ? <Navigate to="/paginaprivada" /> : null}
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
                    <div className="row align-items-start mt-5">
                        <div className="col"></div>
                        <div className="col-10">
                            <h2 className="display-6">Inicio de sesión correcto</h2>
                            <h5>Accediendo...</h5>
                            <br />
                            <div className="spinner" style={{ marginLeft: "33rem", marginTop: "30px" }}>
                                {/* Aquí puedes agregar el contenido de tu spinner */}
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </>
    );
};
