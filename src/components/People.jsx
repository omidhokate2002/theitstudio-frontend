import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:5000/api/person";

const PeopleComponent = () => {
  const [people, setPeople] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getPeople();
  }, []);

  const getPeople = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/people`);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred while fetching people.",
        icon: "error",
      });
    }
  };

  const deletePerson = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/person/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Person deleted successfully",
          icon: "success",
        });

        getPeople();
      } else {
        console.error("Error deleting person:", response.status);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the person.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting person:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the person.",
        icon: "error",
      });
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`${API_BASE_URL}/search/${key}`);
        const result = await response.json();
        if (response.ok) {
          setPeople(result);
        } else {
          console.error("Error searching person:", response.status);
        }
      } catch (error) {
        console.error("Error searching person:", error);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while searching for people.",
          icon: "error",
        });
      }
    } else {
      getPeople();
    }
  };

  const handleCheckboxChange = (personId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(personId)
        ? prevSelectedRows.filter((id) => id !== personId)
        : [...prevSelectedRows, personId]
    );
  };

  const sendSelectedRows = () => {
    const selectedPeople = people.filter((person) =>
      selectedRows.includes(person._id)
    );

    sendEmail(selectedPeople);
  };

  const sendEmail = async (selectedPeople) => {
    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ selectedPeople }),
      });

      if (response.ok) {
        setSelectedRows([]);

        Swal.fire({
          title: "Success!",
          text: "Email sent successfully",
          icon: "success",
        });
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h1 className="h4 mb-0">Persons List</h1>
            </div>
            <div className="card-body">
              <input
                type="text"
                placeholder="Search by name, email and hobbies"
                className="form-control mb-3"
                onChange={searchHandle}
              />
              <button
                className="btn btn-primary mb-3"
                onClick={sendSelectedRows}
                disabled={selectedRows.length === 0}
              >
                Send : info@redpositive.in
              </button>
              {people.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th>Select</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((person, index) => (
                        <tr key={person._id}>
                          <th>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(person._id)}
                              checked={selectedRows.includes(person._id)}
                            />
                          </th>
                          <th scope="row">{index + 1}</th>
                          <td>{person.name}</td>
                          <td>{person.phoneNumber}</td>
                          <td>{person.email}</td>
                          <td>{person.hobbies}</td>
                          <td>
                            <div className="btn-group">
                              <Link
                                className="btn btn-primary btn-sm"
                                to={`/update/${person._id}`}
                              >
                                Update
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deletePerson(person._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center">
                  <h2>No Person Found</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleComponent;
