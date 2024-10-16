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
    }, [actions]); // Dependencia en actions

    if (isChecking) {
        return <div className="text-center">Cargando...</div>; // Puedes agregar un loader aquí si deseas
    }

    if (!store.auth) {
        return <Navigate to="/login" />; // Redirige si no está autenticado
    }

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                padding: "20px",
                color: "#000000",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
            }}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-10 offset-md-1">
                        <h1 className="display-4 fw-bold">
                            ¡Bienvenido a la página privada!
                        </h1>
                        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                            <Link to="/" className="btn btn-primary btn-lg">
                                Ir a Home
                            </Link>
                            <Link to="/profile" className="btn btn-secondary btn-lg">
                                Ver Perfil
                            </Link>
                            <Button
                                variant="danger"
                                size="lg"
                                onClick={() => actions.logout()}
                            >
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
