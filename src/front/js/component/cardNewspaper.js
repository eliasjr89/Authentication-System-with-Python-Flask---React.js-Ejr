import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg"; // Imagen por defecto
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/index.css";

export const CardNewspaper = (props) => {
  const { actions } = useContext(Context);

  // Asegúrate de que estás pasando las propiedades correctas a setid
  const handleEditPaper = () => {
    actions.setid({
      id: props.id,
      name: props.name,
      description: props.description,
      logo: props.logo,
      link: props.link,
    });
  };

  const handleDeletePaper = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await actions.deleteNewspaper(props.id);
        Swal.fire('Deleted!', 'Your newspaper has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
      <img src={rigoImage} className="card-img-top" alt={props.name || "Newspaper"} />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text m-0">Description: {props.description}</p>
        <p className="card-text m-0">Logo: {props.logo}</p>
        <p className="card-text m-0">Link: <a href={props.link} target="_blank" rel="noopener noreferrer">{props.link}</a></p>
        <p className="card-text m-0">ID: {props.id}</p>
        <div className="d-flex justify-content-between mt-3">
          <Link to="/AddNewspaper">
            <button type="button" className="btn btn-outline-secondary" onClick={handleEditPaper}>
              <i className="fa-solid fa-pencil"></i> Edit
            </button>
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDeletePaper}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
