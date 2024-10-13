import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Form, Button, Card } from "react-bootstrap";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const EditNewspaper = () => {
    const { store, actions } = useContext(Context); 
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo: "",
        link: ""
    });

    useEffect(() => {
        const newspaper = store.newspapers.find(news => news.id === parseInt(id));
        if (newspaper) {
            setFormData({
                name: newspaper.name,
                description: newspaper.description,
                logo: newspaper.logo,
                link: newspaper.link
            });
        }
    }, [id, store.newspapers]);

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
                await actions.updateNewspaper(id, formData);
                Swal.fire("Saved!", "", "success");
                navigate("/newspaper");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const handleGoBack = () => {
        navigate("/newspaper");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 display-5"> 
                Edit Newspaper
            </h2>
            <Card className="shadow bg-light"> 
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNewspaperName">
                            <Form.Label>Newspaper Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNewspaperDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNewspaperLogo" className="mt-3">
                            <Form.Label>Logo URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNewspaperLink" className="mt-3">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between flex-wrap mt-4">
                            <Button variant="primary" className="shadow mb-2" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="secondary" className="shadow mb-2" onClick={handleGoBack}>
                                Back
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
