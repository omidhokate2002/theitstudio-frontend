import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      {auth ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              People
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Person
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
