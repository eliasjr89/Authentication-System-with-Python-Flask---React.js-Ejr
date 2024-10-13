import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Context } from "../store/appContext";

export const CategoryDetails = () => {
    const { store } = useContext(Context);
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedCategory = store.categories.find(cat => cat.id === parseInt(id));
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
    }, [id, store.categories]);

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Card className="mt-3 mb-3 shadow p-3 bg-white rounded">
                <Card.Body>
                    <Card.Title className="text-center mb-4 display-5">Category Details</Card.Title>
                    <Card.Text className="mb-2"><strong>ID:</strong> {category.id}</Card.Text>
                    <Card.Text className="mb-2"><strong>Name:</strong> {category.name}</Card.Text>
                    <Card.Text className="mb-4"><strong>Description:</strong> {category.description}</Card.Text>

                    <div className="d-flex justify-content-between mt-4 flex-wrap">
                        <Link to={`/edit-category/${category.id}`}>
                            <Button variant="warning" className="mx-2 mb-2 shadow">
                                Edit Category
                            </Button>
                        </Link>
                        <Button variant="secondary" className="mx-2 mb-2 shadow" onClick={() => navigate("/categories")}>
                            Back to Categories
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
