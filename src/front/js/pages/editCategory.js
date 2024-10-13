// src/front/js/pages/EditCategory.js
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const EditCategory = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        const category = store.categories.find(cat => cat.id === parseInt(id));
        if (category) {
            setFormData({
                name: category.name,
                description: category.description
            });
        }
    }, [id, store.categories]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await actions.updateCategory(id, formData);
                Swal.fire("Saved!", "", "success");
                navigate("/category");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const handleGoBack = () => {
        navigate("/category");
    };

    return (
        <div className="container mt-4">
            <h2>Edit Category</h2>
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                <Form.Group controlId="formCategoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategoryDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-between mt-4">
                    <Button variant="primary" type="submit" className="shadow">
                        Save Changes
                    </Button>
                    <Button variant="secondary" className="ms-2 shadow" onClick={handleGoBack}>
                        Back
                    </Button>
                </div>
            </Form>
        </div>
    );
};
