import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      let result = await fetch(
        "https://theitstudio-backend.onrender.com/api/user/login",
        {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      result = await result.json();

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));

        Swal.fire({
          title: "Success!",
          text: "Login successful",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Please enter correct details.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred during login.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-dark text-white">
          <h1 className="card-title">Login</h1>
        </div>
        <div className="card-body">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control mb-4"
          />
        </div>
        <button onClick={handleLogin} className="btn btn-dark btn-lg btn-block">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
