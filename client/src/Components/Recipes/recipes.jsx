import React from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Recipe from "../Recipe/recipe";

function recipes(props) {
  const { recipes } = props;
  console.log(recipes);

  return (
    <div className="Recipes">
      <div>
        {recipes ? (
          recipes.map((r) => {
            return (
              <Recipe
                key={r?.id}
                id={r?.id}
                title={r?.title}
                image={r?.image}
                dishTypes={r?.dishTypes}
                diets={r?.diets}
                summary={r?.summary}
                instructions={r?.instruction}
                healthScore={r?.healthScore}
              />
            );
          })
        ) : (
          <p>No hay nada</p>
        )}
      </div>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    recipes: state.recipes,
  };
}

export default connect(mapStateToProps, null)(recipes);
