import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/user/Login';
import Panel from "./pages/user/panel/Panel";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [leagueId, setLeagueId] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="user/login" element={<Login />} />
       
          <Route path="user/panel" element={<Panel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
