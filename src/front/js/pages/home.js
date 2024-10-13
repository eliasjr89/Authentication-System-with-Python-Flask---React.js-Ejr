import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardArticle } from "../component/cardArticle";
import { AddArticle } from "./addArticle";
import { EditArticle } from "./editArticle";

export const Home = () => {

    return (
        <div 
            className="d-flex justify-content-center align-items-start" 
            style={{

            }}
        >
            <div className="container w-100">
                <h1 className="text-center mb-4 text-dark display-4 mt-5">¡HELLO!</h1>

                <CardArticle />
                {/* <AddArticle />
                <EditArticle /> */}
            </div>
        </div>
    );
};
