import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setIsButtonDisabled(!(name && email && password));
  }, [name, email, password]);

  const collectData = async () => {
    try {
      let result = await fetch(
        "https://theitstudio-backend.onrender.com/api/user/register",
        {
          method: "post",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      result = await result.json();

      localStorage.setItem("user", JSON.stringify(result));

      if (result) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));

        Swal.fire({
          title: "Success!",
          text: "Registration successful",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred during registration.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark text-white">
          <h1 className="card-title">Register</h1>
        </div>
        <div className="card-body">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control mb-3"
            required
          />
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control mb-3"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control mb-4"
            required
          />
        </div>
        <button
          type="button"
          onClick={collectData}
          className="btn btn-dark btn-lg"
          disabled={isButtonDisabled}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
