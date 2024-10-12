import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormData } from "../component/form";

export const Home = () => {
    const { store } = useContext(Context);
    const [showFormData, setShowFormData] = useState(false);

    const handleLoginClick = () => {
        setShowFormData(true);
    };

    const handleCloseForm = () => {
        setShowFormData(false);
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-start" 
            style={{
                minHeight: "100vh",
                padding: '2rem',
                backgroundColor: "#f8f9fa"
            }}
        >
            <div className="w-100">
                <h1 className="text-center mb-4 text-dark display-4">Welcome to the Home Page</h1>
                
                {/* Aquí puedes añadir los otros componentes como Category, Newspaper, etc. */}
                {/* <Category /> */}
                {/* <Newspaper /> */}
                {/* <Author /> */}
                {/* <Article /> */}
            </div>
        </div>
    );
};
