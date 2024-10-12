import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal, Button } from "react-bootstrap";
import { LoginForm } from "../component/loginForm";
import { SignupForm } from "../component/signupForm";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [modalShow, setModalShow] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [open, setOpen] = useState(false); // Definido aquí
    const location = useLocation();
    const navigate = useNavigate(); // Usar useNavigate para redirigir

    const handleLogout = () => {
        actions.logout(); // Esto debería eliminar el token del localStorage
        setOpen(false); // Cerrar el menú
        navigate("/logoutOk"); // Redirigir a la página de despedida
    };

    const toggleMenu = () => {
        setOpen(prevState => !prevState); // Cambiar el estado del menú
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to="/" className="navbar-brand">
                        <h1 className="text-light">App News</h1>
                    </Link>
                    {store.auth === false && location.pathname === "/" && (
                        <Button onClick={() => setModalShow(true)} className="btn btn-light">
                            Iniciar Sesión
                        </Button>
                    )}
                    {store.auth === true && (
                        <button 
                            onClick={toggleMenu} 
                            className="btn btn-light"
                        >
                            Menu
                        </button>
                    )}
                </div>
            </nav>

            {/* Modal para Iniciar Sesión o Registro */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} ClassName="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>{isLogin ? "Iniciar Sesión" : "Registro"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-4">
                    {isLogin ? <LoginForm onClose={() => setModalShow(false)} /> : <SignupForm />}
                    <div className="mt-3">
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Menú desplegable */}
            <div className={`menu ${open ? "open" : "closed"}`}>
                {open && (
                    <>
                        <button
                            aria-label="Close"
                            className="close-button"
                            onClick={toggleMenu}
                        >
                            &times;
                        </button>
                        <div className="menu-container">
                            <Link to="/" className="menu-item">Home</Link>
                            <Link to="/contact" className="menu-item">About us</Link>
                            <Link to="/services" className="menu-item">Services</Link>
                            {/* Botón de logout dentro del menú */}
                            <button onClick={handleLogout} className="menu-item btn btn-danger">Logout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
