import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

import ManageUsers from "./pages/ManageUser";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/manage-user" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
