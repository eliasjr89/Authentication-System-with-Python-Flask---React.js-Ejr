import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Category } from "./category";

export const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-start" style={{}}>
      <div className="container w-100">
        <h1 className="text-center mb-4 text-dark display-4 mt-5">¡HELLO!</h1>

        <Category />

        <p className="text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="text-primary">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
