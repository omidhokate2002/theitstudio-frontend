import { useState } from "react";
import Swal from "sweetalert2";

const API_BASE_URL = "https://theitstudio-backend.onrender.com/api/person";

const AddPerson = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [error, setError] = useState(false);

  const handleAddPerson = async () => {
    if (!name || !phoneNumber || !email || !hobbies) {
      setError(true);
      return;
    }

    try {
      const result = await fetch(`${API_BASE_URL}/add-person`, {
        method: "post",
        body: JSON.stringify({
          name,
          phoneNumber,
          email,
          hobbies,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await result.json();

      if (result.ok) {
        setName("");
        setPhoneNumber("");
        setEmail("");
        setHobbies("");
        setError(false);

        Swal.fire({
          title: "Success!",
          text: "Person added successfully!",
          icon: "success",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        setError(true);
        const errorMessage =
          response.message || "An error occurred while adding the person.";
        console.error(errorMessage);

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      }
    } catch (error) {
      setError(true);
      console.error("Error adding person:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the person.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark text-white">
          <h1 className="h4 mb-0">Add Person</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${error && !name ? "is-invalid" : ""}`}
              placeholder="Person Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && (
              <div className="invalid-feedback">
                Please enter a valid person name.
              </div>
            )}
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
            {error && !phoneNumber && (
              <div className="invalid-feedback">
                Please enter a valid phone number.
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${error && !email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && (
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            )}
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
            {error && !hobbies && (
              <div className="invalid-feedback">
                Please enter valid hobbies.
              </div>
            )}
          </div>
        </div>
        <button
          className="btn btn-dark btn-lg btn-block"
          onClick={handleAddPerson}
        >
          Add Person
        </button>
      </div>
    </div>
  );
};

export default AddPerson;
