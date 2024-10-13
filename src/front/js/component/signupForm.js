import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SignupForm = ({ handleClose, setIsLogin }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("El email ingresado no es válido.");
            return;
        }

        const requestBody = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        };

        try {
            const result = await actions.signup(requestBody);
            if (result.success) {
                console.log('Registro exitoso:', result.message);
                handleClose();
                navigate("/signupOk");
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage("Ocurrió un error al registrarse. Por favor, inténtelo de nuevo más tarde.");
        }
    };

    return (
        <Modal.Body>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ingrese su nombre"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Apellido:</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Ingrese su apellido"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingrese su email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirmar Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme su contraseña"
                        required
                    />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                    <Button type="submit" className="btn btn-primary">
                        Registro
                    </Button>
                    <Button type="button" className="btn btn-secondary" onClick={handleClose}>
                        Volver
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    );
};
