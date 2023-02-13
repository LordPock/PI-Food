import { Link, Outlet } from "react-router-dom";
import React from "react";

function Home() {
  return (
    <div className="Home">
      <h1>Bienvenidos</h1>
      <Link to={"/recipes"}>
        <button>Ingresar</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Home;
