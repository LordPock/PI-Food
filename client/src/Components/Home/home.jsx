import { Link, Outlet } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { addRecipes } from "../../redux/actions";

function Home() {

  const dispatch = useDispatch()

  async function getRecipes() {
    await dispatch(addRecipes())
  }

  return (
    <div className="Home">
      <h1>Bienvenidos</h1>
      <Link to={"/recipes"}>
        <button onClick={getRecipes}>Ingresar</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Home;
