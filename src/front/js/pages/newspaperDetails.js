import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { Context } from "../store/appContext";

export const NewspaperDetails = () => {
    const { store } = useContext(Context);
    const { id } = useParams();
    const [newspaper, setNewspaper] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const selectedNewspaper = store.newspapers.find(news => news.id === parseInt(id));
        if (selectedNewspaper) {
            setNewspaper(selectedNewspaper);
        }
    }, [id, store.newspapers]);

    if (!newspaper) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Card className="shadow bg-light">
                <Card.Body>
                    <Card.Title className="text-center display-5">
                        Newspaper Details
                    </Card.Title>

                    <Card.Text className="mt-4">
                        <strong>ID:</strong> {newspaper.id}
                    </Card.Text>

                    <Card.Text>
                        <strong>Name:</strong> {newspaper.name}
                    </Card.Text>

                    <Card.Text>
                        <strong>Description:</strong> {newspaper.description}
                    </Card.Text>

                    <Card.Text>
                        <strong>Logo:</strong>
                        <a href={newspaper.logo} target="_blank" rel="noopener noreferrer" className="ml-2">
                            <img
                                src={newspaper.logo}
                                alt={`${newspaper.name} logo`}
                                style={{ width: "50px", height: "auto", marginLeft: "10px" }}
                            />
                        </a>
                    </Card.Text>

                    <Card.Text>
                        <strong>Link:</strong>
                        <a href={newspaper.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                            {newspaper.link}
                        </a>
                    </Card.Text>

                    <div className="d-flex justify-content-between flex-wrap mt-4">
                        <Link to={`/edit-newspaper/${newspaper.id}`}>
                            <Button variant="warning" className="shadow mb-2">
                                Edit Newspaper
                            </Button>
                        </Link>
                        <Button variant="secondary" className="shadow mb-2" onClick={() => navigate("/newspaper")}>
                            Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};
