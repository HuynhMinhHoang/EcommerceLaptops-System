import React from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spring Boot + React App</h1>
        <Login /> 
        {/* <Register /> */}
      </header>
    </div>
  );
}

export default App;
