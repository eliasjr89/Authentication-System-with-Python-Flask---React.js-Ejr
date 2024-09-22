import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link } from "react-router-dom";
import BcgImg from '../../img/fondo.png';
import "../../styles/form.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async () => {
        const response = await actions.signup(email, password);
        if (response.success) {
            setRedirectToHome(true);
        } else {
            setErrorMessage(response.message);
        }
    };

    if (redirectToHome) {
        return <Navigate to="/signupok" replace />;
    }

    return (
        <div 
            className="d-flex justify-content-center align-items-center" 
            style={{
                backgroundImage: `url(${BcgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh"
            }}
        >
            <div className="align-self-start" style={{ marginTop: '5%' }}>
                <div className="form-container">
                    <h1>Registro</h1>
                    <br />
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="futuristic-label">Email:</label>
                            <input
                                type="email"
                                className="form-control futuristic-input"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="futuristic-label">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control futuristic-input"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                id="btnForm" 
                                style={{ width: 'auto' }} // Ajustar el ancho al contenido
                            >
                                Registro
                            </button>
                            <Link to="/">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    id="btnForm" 
                                    style={{ width: 'auto' }} // Ajustar el ancho al contenido
                                >
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
