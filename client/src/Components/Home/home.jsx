import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDiets, getRecipes} from "../../redux/actions";

function Home() {

  const dispatch = useDispatch()



  // async function getRecipe() {
  //   await dispatch(addDiets())
  //   await dispatch(getRecipes())
    
  // }

  return (
    <div className="Home">
      <h1>Bienvenidos a HENRY en tu cocina</h1>
      <Link to={"/recipes"}>
        <button >Ingresar</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Home;
