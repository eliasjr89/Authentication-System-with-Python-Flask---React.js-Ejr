import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap"; 
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom"; 
import Swal from "sweetalert2";

export const AddAuthor = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState(null);
    const navigate = useNavigate(); 

    // Cargar los datos del autor temporal al iniciar
    useEffect(() => {
        if (store.temp && store.temp.id) {
            setName(store.temp.name);
            setDescription(store.temp.description);
            setPhoto(store.temp.photo);
            setId(store.temp.id);
        } else {
            console.log("No data in the temporary component, adding new author");
        }
    }, [store.temp]);

    // Cargar la lista de autores
    useEffect(() => {
        actions.loadAuthors();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        // Si existe un ID, se actualiza el autor, sino se agrega uno nuevo
        if (id) {
            await actions.updateAuthor(id, { name, description, photo });
            Swal.fire({
                icon: "success",
                title: "Author updated!",
                text: "The author has been successfully updated.",
            });
        } else {
            await actions.newAuthor({ name, description, photo });
            Swal.fire({
                icon: "success",
                title: "Author added!",
                text: "The new author has been successfully added.",
            });
        }

        // Limpiar los campos del formulario y restablecer el estado
        setName("");
        setDescription("");
        setPhoto("");
        setId(null);

        // Redirigir a la lista de autores
        navigate("/author");
    };

    return (
        <div className="container mt-4 text-dark">
            <h1 className="display-4 text-center mb-4 text-dark">{id ? "Update Author" : "Add New Author"}</h1>
            <div className="shadow p-4 mb-5 bg-white rounded"> {/* Fondo blanco y sombra */}
                <Form onSubmit={handleSave}>
                    {/* Campo de nombre del autor */}
                    <Form.Group controlId="authorName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Campo de descripción del autor */}
                    <Form.Group controlId="authorDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Campo de URL de la foto del autor */}
                    <Form.Group controlId="authorPhoto" className="mt-3">
                        <Form.Label>Photo URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter photo URL"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Botones para agregar/actualizar autor y regresar */}
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="primary" type="submit" className="shadow">
                            {id ? "Update Author" : "Add Author"} {/* Botón dinámico según el estado */}
                        </Button>
                        <Link to="/author">
                            <Button variant="secondary" className="shadow"> {/* Botón para regresar */}
                                Back to Authors
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
