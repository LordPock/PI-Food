import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home/home";
import Recipes from "./Components/Recipes/recipes";
import RecipeDetail from "./Components/RecipeDetail/recipeDetail";
import Nav from "./Components/Nav/nav"
import Create from "./Components/Create/create";

function App() {

  const [access, setAccess] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    !access && navigate('/')
  }, [access])


  if(location.pathname === '/') {
    return (
      <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            </Routes>
            </div>)

  } else {
  return (
    <div className="App">
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetail />}/>
          <Route path='/create' element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}
}
export default App;
