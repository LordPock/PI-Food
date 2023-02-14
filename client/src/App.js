import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Components/Home/home";
import Recipes from "./Components/Recipes/recipes";
import RecipeDetail from "./Components/RecipeDetail/recipeDetail";

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetail />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
