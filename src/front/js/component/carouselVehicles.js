import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { CarouselDefault } from "./carouselDefault";
import { CarouselMotos } from "./carouselMotos";
import { CarouselCars } from "./carouselCars";
import { CarouselPrice } from "./carouselPrice";
import { CarouselKm } from "./carouselKm";



export const CarouselVehicles = () => {
    
    defineElement(lottie.loadAnimation);
    const {store, actions} = useContext(Context)
    

    return (
      <div className="container mb-">
          <div className="row pb-4 my-4">

            
            <h2>Asequibles</h2>
            <hr className="mb-4"></hr>
                  <CarouselPrice />
           </div>
          
           <div className="row pb-4 my-4">
            <h2>Los más vistosos</h2>
            <hr className="mb-4"></hr>
                  <CarouselDefault />
            </div>


           <div className="row pb-4 my-4">
            <h2>Motos</h2>
            <hr className="mb-4"></hr>
                  <CarouselMotos />
            </div>


            <div className="row pb-4 my-4">
            <h2>De bajo kilometraje</h2>
            <hr className="mb-4"></hr>
                  <CarouselKm />
            </div>


           <div className="row pb-4 my-4">
            <h2>Coches</h2>
            <hr className="mb-4"></hr>
                  <CarouselCars />
            </div>





            </div>    
          );

        }