import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PeopleComponent from "./components/People.jsx";
import UpdatePerson from "./components/UpdatePerson.jsx";
import AddPerson from "./components/AddPerson";

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
          <Route path="/" element={<PeopleComponent />} />
          <Route path="/add" element={<AddPerson />} />
          <Route path="/update/:id" element={<UpdatePerson />} />
          <Route path="/logout" element={<h3>Logout</h3>} />
        </Routes>
      </div>
    </div >
  );
}

export default App;
