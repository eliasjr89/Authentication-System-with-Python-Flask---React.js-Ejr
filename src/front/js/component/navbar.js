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
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        setOpen(false);
        navigate("/logoutOk");
    };

    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    };

    const handleCloseModal = () => {
        setModalShow(false);
        setIsLogin(true);
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

            <Modal show={modalShow} onHide={handleCloseModal} className="modal-dialog-centered mt-5">
                <Modal.Header closeButton>
                    <Modal.Title className="display-6 fw-bold">{isLogin ? "Iniciar Sesión" : "Registro"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-4">
                    {isLogin ? (
                        <LoginForm onClose={handleCloseModal} />
                    ) : (
                        <SignupForm handleClose={handleCloseModal} setIsLogin={setIsLogin} />
                    )}
                    <div className="mt-3">
                        <Button variant="link" onClick={() => {
                            setIsLogin(!isLogin);
                        }}>
                            {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

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
                            <button onClick={handleLogout} className="menu-item btn btn-danger">Logout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
