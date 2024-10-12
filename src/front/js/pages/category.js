import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap"; 
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const Category = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    actions.loadCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await actions.deleteCategory(id);
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the category.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Container className="my-4 shadow p-4 bg-white rounded">
      <h1 className="display-4 text-center my-4 text-dark">Categories</h1>
      
      <div className="d-flex justify-content-between mt-3 mb-3 flex-wrap"> {/* Flex-wrap para un diseño responsive */} 
        <Link to="/add-category">
          <Button variant="primary" className="mx-2 mb-2 shadow"> {/* Sombra para un diseño moderno */} 
            Add Category
          </Button>
        </Link>

        {location.pathname === "/category" && (
          <Link to="/">
            <Button variant="secondary" className="mx-2 mb-2 shadow mt-2">
              Back to Home
            </Button>
          </Link>
        )}
      </div>

      <hr className="my-4" />

      <div className="table-responsive"> {/* Responsividad para la tabla */} 
        <Table striped bordered hover className="shadow"> {/* Sombra en la tabla para un diseño más atractivo */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  --- Add a new category ---
                </td>
              </tr>
            ) : (
              store.categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <div className="d-flex justify-content-around flex-wrap">
                      <Link to={`/category-details/${category.id}`}>
                        <Button variant="info" className="mx-1 mb-1"> {/* Margen inferior para mejor adaptación en móviles */} 
                          View
                        </Button>
                      </Link>
                      <Link to={`/edit-category/${category.id}`}>
                        <Button variant="warning" className="mx-1 mb-1">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="mx-1 mb-1"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
