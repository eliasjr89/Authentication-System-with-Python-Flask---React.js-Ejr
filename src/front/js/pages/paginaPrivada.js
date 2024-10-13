import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Category } from "./category";
import "../../styles/index.css";

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
                        <p className="lead">
                            Si has llegado hasta aquí, ¡quiere decir que todo funciona correctamente! 😍👌🚀🚀
                        </p>
                        <hr className="my-4" />
                        <p>
                            Puedes explorar otras secciones o regresar a la página principal. Gracias por ser parte de nuestra comunidad.
                        </p>

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
                            </Button>
                            <Category />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-4 text-center">
                        <h3 className="fw-bold">Nuestra Misión</h3>
                        <p>
                            Crear la mejor experiencia de usuario en todas nuestras aplicaciones, con tecnología de punta y un diseño impecable.
                        </p>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <h3 className="fw-bold">Servicios</h3>
                        <p>
                            Ofrecemos una variedad de servicios para satisfacer las necesidades de nuestros usuarios. ¡Explora nuestras funcionalidades exclusivas!
                        </p>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <h3 className="fw-bold">Contacto</h3>
                        <p>
                            ¿Tienes alguna pregunta? No dudes en contactarnos a través de nuestras redes sociales o nuestro formulario de contacto.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
