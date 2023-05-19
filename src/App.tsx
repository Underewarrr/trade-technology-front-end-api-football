import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/user/Login';
import Leagues from './pages/user/panel/Leagues';
import Seasons from "./pages/user/panel/Seasons";
import Panel from "./pages/user/panel/Panel";
import Countries from "./pages/user/panel/Contries";
import LeagueInfo from "./pages/user/panel/league/LeagueInfo";
import TeamDetails from "./pages/user/panel/team/TeamDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="user/login" element={<Login />} />
          <Route path="user/panel/countries" element={<Countries />} />
          <Route path="user/panel/leagues" element={<Leagues />} />
          <Route path="user/panel/seasons" element={<Seasons />} />
          <Route path="user/panel" element={<Panel />} />
          <Route path="user/panel/leagues/:id" element={<LeagueInfo />} />
          <Route path="user/panel/team/:id" element={<TeamDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
