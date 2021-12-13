import React, { useState } from "react";
import "./App.css";
import FetchData from "./components/StarWors/FetchData";
import Header from "./components/Header/Header";
import Loader from "./shared/components/Loader/Loader";

function App() {

  return (
    <div className="App">
      <Header />
      <FetchData />
      {/* {loading ? <Loader /> : } */}
    </div>
  );
}

export default App;
