import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PeopleComponent from "./components/People.jsx";
import UpdatePerson from "./components/UpdatePerson.jsx";
import AddPerson from "./components/AddPerson";
import Signup from "./components/Signup";
import PrivateCompo from "./components/PrivateComp";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: "80px",
        }}
      >
        <Routes>
          <Route element={<PrivateCompo />}>
            <Route path="/" element={<PeopleComponent />} />
            <Route path="/add" element={<AddPerson />} />
            <Route path="/update/:id" element={<UpdatePerson />} />
            <Route path="/logout" element={<h3>Logout</h3>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
