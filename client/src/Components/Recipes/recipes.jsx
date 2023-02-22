import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addDiets, getRecipes } from "../../redux/actions";
import Loading from "../Loading/loading";
import Paginado from "../Paginado/paginado";
import Recipe from "../Recipe/recipe";

function Recipes(props) {
  const { recipes } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(addDiets());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const recipesToShow = recipes.slice(indexFirstRecipe, indexLastRecipe);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="Recipes">
          <Paginado
            recipesPerPage={recipesPerPage}
            recipes={recipes.length}
            paginado={paginado}
          />
          {recipesToShow ? (
            recipesToShow.map((r) => {
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
      )}
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
