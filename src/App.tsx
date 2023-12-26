import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RequiredAuth from "./routes/RequiredAuth";
import Sign from "./components/Sign";
import NamScan from "./components/NamScan";
import Home from "./components/Home";
import NavbarComponent  from "../src/components/NavbarComponent.jsx";
const App = () => {
  return (
    <div className="w-screen  min-h-screen bg-black ">
      <Router>
        {/* <NavbarComponent/> */}
        <div className="absolute left-7 top-5 text-2xl">
          <span className="">N</span><span className="text-[#C73848]">A</span><span className="">M</span>S<span className="text-[#C73848]">C</span>AN
        </div>
        <Routes>
          <Route element={<RequiredAuth />}>
            <Route path="/" element={<Sign />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/namscan" element={<NamScan />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
