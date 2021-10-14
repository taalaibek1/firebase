import React from "react";
import Add from "../components/Add";
import List from "../components/List";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Add />
      <List />
    </div>
  );
};

export default Main;
