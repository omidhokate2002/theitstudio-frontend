import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
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
        {/* Add any other navigation items as needed */}
      </ul>
      {/* Add your heading here */}
      <h1 className="navbar-heading">Your Heading</h1>
    </nav>
  );
};

export default Navbar;
