import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const LoginForm = ({ onClose }) => { // Recibe onClose como prop
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const response = await actions.login(email, password);

        if (response.success) {
            // Si el login es exitoso, redirigir y cerrar el modal
            navigate("/signupOk");
            onClose(); // Cierra el modal
        } else {
            setError(response.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <Button type="submit" className="btn btn-primary">Iniciar Sesión</Button>
        </form>
    );
};
