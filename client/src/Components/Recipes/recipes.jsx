import React from "react";
import { useState } from "react";
import Recipe from "../Recipe/recipe";

async function Recipes() {
 //const [recetas, setRecetas] = useState([]);
  var recetas = [];
  
 if (recetas.length === 0) {
    await fetch("http://localhost:3001/recipes")
      .then((r) => r.json())
      .then((data) => {
        //setRecetas([...recetas, data]);
        recetas = data;
        // console.log(recetas)
        // console.log(data);
      });
    }

 
  return (
    <div className="Recipes">
      <div>
        {recetas.map((r) => {
          return (
            //console.log('receta id' + r.id),
            (
              <Recipe
                id={r?.id}
                title={r?.title}
                image={r?.image}
                // dishTypes={r?.dishTypes}
                // diets={r?.diets}
                summary={r?.summary}
                // instructions={r?.instruction}
                healthScore={r?.healthScore}
              />
            )
          );
        })}
     </div> 
    </div>
  );
}

export default Recipes;
