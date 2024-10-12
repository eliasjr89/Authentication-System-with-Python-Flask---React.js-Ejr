import React from "react";
import { Link } from "react-router-dom";

export const CardArticle = ({ title, content, image, published_date, source, link, author, newspaper, category, id }) => {
    return (
        <div className="card" style={{ width: "18rem", margin: "1rem" }}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <p className="card-text"><small className="text-muted">Published on: {published_date}</small></p>
                <p className="card-text"><small className="text-muted">Source: {source}</small></p>
                <p className="card-text"><small className="text-muted">Author: {author?.name}</small></p>
                <p className="card-text"><small className="text-muted">Newspaper: {newspaper?.name}</small></p>
                <p className="card-text"><small className="text-muted">Category: {category?.name}</small></p>
                <Link to={`/articles/${id}`} className="btn btn-primary">Edit</Link>
            </div>
        </div>
    );
};
