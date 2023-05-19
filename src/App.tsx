import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/user/Login';
import Leagues from './pages/user/panel/Leagues';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="user/login"
            element={ <Login /> }
          />   
          <Route
            path="user/panel/leagues"
            element={ <Leagues /> }
          />       
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;