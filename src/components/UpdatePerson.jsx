/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePerson = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const baseURL = "https://theitstudio-backend.onrender.com/api/person/person/";

  useEffect(() => {
    getPersonDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPersonDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}${params.id}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setName(result.name);
        setPhoneNumber(result.phoneNumber);
        setEmail(result.email);
        setHobbies(result.hobbies);
      } else {
        setError(true);
        console.error("Error fetching person details:", response.status);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching person details:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePerson = async () => {
    try {
      const response = await fetch(
        `${baseURL}${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name, phoneNumber, email, hobbies }),
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Person updated successfully",
          icon: "success",
        });
        navigate("/");
      } else {
        setError(true);
        console.error("Error updating person:", response.status);
      }
    } catch (error) {
      setError(true);
      console.error("Error updating person:", error);
    }
  };

  if (loading) {
    return <div className="d-flex align-items-center justify-content-center" style={{ height: "60vh" }}>
      <p id="loading-message" className="text-center">
        Loading...
      </p>
    </div>
  }

  if (error) {
    return <div className="d-flex align-items-center justify-content-center" style={{ height: "60vh" }}>
      <p id="loading-message" className="text-center">
        Error loading person details.
      </p>
    </div>
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h1 className="h4 mb-0">Update Person</h1>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${error && !name ? "is-invalid" : ""
                    }`}
                  placeholder="Person Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className={`form-control ${error && !phoneNumber ? "is-invalid" : ""
                    }`}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${error && !email ? "is-invalid" : ""
                    }`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${error && !hobbies ? "is-invalid" : ""
                    }`}
                  placeholder="Hobbies"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-dark btn-lg btn-block"
              onClick={updatePerson}
            >
              Update Person
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePerson;
