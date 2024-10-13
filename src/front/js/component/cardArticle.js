import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/index.css";

export const CardArticle = ({
    id,
    title,
    content,
    image,
    published_date,
    source,
    link,
    author,
    newspaper,
    category
}) => {
    const { actions } = useContext(Context);

    // Estado para manejar el modo de edición
    const [isEditing, setIsEditing] = useState(false);
    const [editedArticle, setEditedArticle] = useState({
        title,
        content,
        image,
        published_date,
        source,
        link,
        author,
        newspaper,
        category,
    });

    // Función para alternar entre modo edición y visualización
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Función para manejar los cambios en los campos de entrada
    const handleChange = (e) => {
        setEditedArticle({
            ...editedArticle,
            [e.target.name]: e.target.value,
        });
    };

    // Función para guardar los cambios en el artículo
    const handleSave = async () => {
        await actions.updateArticle(id, editedArticle);
        setIsEditing(false);
        Swal.fire("Guardado!", "", "success");
    };

    // Función para eliminar el artículo con confirmación
    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
            actions.deleteArticle(id);
            Swal.fire("Eliminado!", "El artículo ha sido eliminado.", "success");
        }
    };

    return (
        <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
            <img
                src={editedArticle.image || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={editedArticle.title}
            />
            <div className="card-body">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={editedArticle.title}
                            onChange={handleChange}
                            className="form-control mb-2"
                            placeholder="Título"
                        />
                        <textarea
                            name="content"
                            value={editedArticle.content}
                            onChange={handleChange}
                            className="form-control mb-2"
                            placeholder="Contenido"
                        />
                        <input
                            type="text"
                            name="image"
                            value={editedArticle.image}
                            onChange={handleChange}
                            className="form-control mb-2"
                            placeholder="URL de imagen"
                        />
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="button"
                                className="btn btn-success w-100"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary w-100 ms-2"
                                onClick={handleEditToggle}
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h5 className="card-title">{editedArticle.title}</h5>
                        <p className="card-text">{editedArticle.content}</p>
                        <p className="card-text"><small className="text-muted">Publicado el: {editedArticle.published_date}</small></p>
                        <p className="card-text"><small className="text-muted">Fuente: {editedArticle.source}</small></p>
                        <p className="card-text"><small className="text-muted">Autor: {editedArticle.author}</small></p>
                        <p className="card-text"><small className="text-muted">Periódico: {editedArticle.newspaper}</small></p>
                        <p className="card-text"><small className="text-muted">Categoría: {editedArticle.category}</small></p>
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={handleEditToggle}
                            >
                                <i className="fa-solid fa-pencil"></i> Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                <i className="fa-solid fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
