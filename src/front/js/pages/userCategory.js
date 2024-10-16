import React, { useEffect, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";

export const UserCategories = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        // Verifica si el usuario está autenticado
        if (!store.auth) {
            navigate("/"); // Redirige a la página de inicio o login
        } else {
            actions.loadCategories(); // Carga las categorías solo si está autenticado
        }
    }, [store.auth]); // Asegúrate de que se ejecute cada vez que cambie el estado de autenticación

    const handleSelectCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleContinue = () => {
        // Aquí puedes agregar lógica para guardar las categorías seleccionadas si es necesario
        navigate("/paginaprivada"); // Cambia esto a la ruta de tu página privada
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5" style={{ minHeight: "100vh" }}>
            <h1 className="display-4 text-center mb-4">Add one or more categories</h1>

            <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                Add Categories
            </Button>

            <hr className="my-4" />

            <Modal show={showModal} onHide={handleCloseModal} className="mt-5">
                <Modal.Header closeButton>
                    <Modal.Title>Select Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-center">
                        {store.categories.length === 0 ? (
                            <p className="text-center w-100">--- No categories available ---</p>
                        ) : (
                            store.categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategories.includes(category.id) ? "success" : "outline-primary"}
                                    className="m-2"
                                    onClick={() => handleSelectCategory(category.id)}
                                >
                                    {category.name}
                                </Button>
                            ))
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={handleCloseModal} style={{ width: '120px' }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal} style={{ width: '120px' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Botón para continuar */}
            {selectedCategories.length > 0 && (
                <Link to="/paginaprivada">
                    <Button variant="success" onClick={handleContinue}>
                        Continue
                    </Button>
                </Link>
            )}
        </div>
    );
};
