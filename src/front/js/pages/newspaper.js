import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const Newspaper = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getNewspapers();
  }, []);

  const handleDeleteNewspaper = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const success = await actions.deleteNewspaper(id);
      if (success) {
        Swal.fire({
          title: "Deleted!",
          text: "The newspaper has been deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "The newspaper could not be deleted.",
          icon: "error",
        });
      }
    }
  };

  return (
    <Container fluid className="my-4 shadow p-4 bg-white rounded">
      <h1 className="display-4 text-center my-4 text-dark">Newspapers</h1>
      
      <div className="d-flex justify-content-between mt-3 mb-3">
        <Link to="/add-newspaper">
          <Button variant="primary" className="mx-2 shadow">
            Add Newspaper
          </Button>
        </Link>

        {location.pathname === "/newspaper" && (
          <Link to="/">
            <Button variant="secondary" className="mx-2 shadow mt-2">
              Back to Home
            </Button>
          </Link>
        )}
      </div>

      <hr className="my-4" />

      <div className="table-responsive">
        <Table striped bordered hover className="shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Logo</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.newspapers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  --- Add a new newspaper ---
                </td>
              </tr>
            ) : (
              store.newspapers.map((newspaper) => (
                <tr key={newspaper.id}>
                  <td>{newspaper.id}</td>
                  <td className="text-wrap">{newspaper.name}</td>
                  <td className="text-wrap">{newspaper.description}</td>
                  <td>
                    <img
                      src={newspaper.logo}
                      alt={`${newspaper.name} logo`}
                      className="img-fluid" // Esto hará que la imagen sea responsive
                      style={{ width: "50px", height: "auto" }}
                    />
                  </td>
                  <td className="text-wrap">
                    <a href={newspaper.link} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                  <td>
                    <Link to={`/newspaper-details/${newspaper.id}`}>
                      <Button variant="info" className="mx-1 shadow">
                        View
                      </Button>
                    </Link>
                    <Link to={`/edit-newspaper/${newspaper.id}`}>
                      <Button variant="warning" className="mx-1 shadow">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteNewspaper(newspaper.id)}
                      className="mx-1 shadow"
                    >
                      Delete
                    </Button>
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
