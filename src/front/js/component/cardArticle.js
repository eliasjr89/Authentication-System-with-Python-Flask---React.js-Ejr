// src/component/CardArticle.js
import React, { useState, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa";
import { Context } from "../store/appContext";

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
  category,
}) => {
  const { store, actions } = useContext(Context);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
    actions.addFavoriteArticle(id); 
  };

  return (
    <Card className="my-3">
      {image ? (
        <Card.Img variant="top" src={image} alt={title} />
      ) : (
        <Card.Img variant="top" src="path/to/default-image.jpg" alt="Image not available" />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content && typeof content === "string" ? (
            content
          ) : (
            <p>Contenido no disponible</p>
          )}
        </Card.Text>
        <Card.Footer>
          <small className="text-muted">
            {published_date && new Date(published_date).toLocaleDateString()} 
            {source && ` | ${source}`} 
            {newspaper && ` | ${newspaper}`} 
            {author && ` | by ${author}`} 
            {category && ` | Category: ${category}`}
          </small>
        </Card.Footer>
        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" href={link} target="_blank" className="me-2">
            Read More
          </Button>
          <Button variant="outline-success" onClick={handleLike}>
            <FaThumbsUp className="me-1" /> 
            {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
