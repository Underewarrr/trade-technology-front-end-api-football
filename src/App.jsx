import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/user/Login';
import Panel from "./pages/user/panel/Panel";
import TeamInfo from "./pages/user/panel/team/TeamInfo";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="user/login" element={<Login />} />
       
          <Route path="user/panel" element={<Panel />} />
          <Route path="user/panel/team/:id" element={<TeamInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
