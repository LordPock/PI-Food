import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
//import Loading from "../Loading/loading";
import Recipe from "../Recipe/recipe";

function Recipes(props) {
  const { recipes } = props;

  return (
    <div className="Recipes">
      {/* {!isLoading ? <Loading /> :  */}
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
{/* } */}
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    diets: state.diets,
  };
}

export default connect(mapStateToProps, null)(Recipes);
