import React, { useContext } from "react";
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
  

  const isFavorited = store.favoriteArticles.some(article => article.article_id === id);

  const handleLike = async (id, user_id) => {
    try {
      const userId = store.userId;
      
      if (!id || !userId) {
        console.error("Article ID and User ID are required.");
        return; 
      }

      let success;


      if (isFavorited) {
        success = await actions.removeFavoriteArticle(id, userId);
        if (success) {
          console.log("Artículo eliminado de favoritos");
        }
      } else {
        success = await actions.addFavoriteArticle(id, userId);
        if (success) {
          console.log("Artículo agregado a favoritos");
        }
      }
    } catch (error) {
      console.error("Error al manejar el artículo favorito", error);
    }
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
            {newspaper && ` | ${newspaper.name}`} 
            {author && ` | by ${author.name}`} 
            {category && ` | Category: ${category.name}`}
          </small>
        </Card.Footer>

        <div className="d-flex align-items-center mt-3">
          <Button variant="primary" href={link} target="_blank" className="me-2">
            Read More
          </Button>
          <Button
            variant={isFavorited ? "success" : "outline-success"}
            onClick={handleLike}
          >
            <FaThumbsUp className="me-1" />
            {isFavorited ? "Added to Favorites" : "Add to Favorites"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
