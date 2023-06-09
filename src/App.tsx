import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/user/Login';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="user/login"
            element={ <Login /> }
          />       
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;