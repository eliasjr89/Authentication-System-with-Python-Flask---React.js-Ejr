import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
// import BcgImg from '../../img/fondo.png';
import "../../styles/home.css";

export const PaginaPrivada = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
            await actions.verifyToken();
        };

        checkAuth();
    }, []);

    if (!store.auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div 
            className="d-flex justify-content-center align-items-center"
            style={{
                // backgroundImage: `url(${BcgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                color: "#ecf0f1",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
        >
            <div className="container text-center">
                <div className="row align-items-start mt-3"> {/* Cambié mt-5 a mt-3 */}
                    <div className="col"></div>
                    <div className="col-12 col-md-10">
                        <h1 className="display-4 fw-bold">
                            Si has llegado hasta aquí, ¡quiere decir que todo funciona correctamente! 😍👌🚀🚀
                        </h1>
                        <br />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    );
};
