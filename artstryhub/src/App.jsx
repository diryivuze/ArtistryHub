import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Challenges from "./pages/Challenges";
import Events from "./pages/Events";
import Collaborations from "./pages/Collaborations";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Forget from "./pages/forget";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/events" element={<Events />} />
        <Route path="/collaborations" element={<Collaborations />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
    </Router>
  );
};

export default App;
