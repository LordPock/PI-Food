import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, emptyMessage, getRecipes } from "../../redux/actions";
import Loading from "../Loading/loading";
import Paginado from "../Paginado/paginado";
import Recipe from "../Recipe/recipe";
import styles from "./recipes.module.css";

function Recipes(props) {
  const { recipes, message } = props;
  const dispatch = useDispatch();
  const navigation = useNavigate()
  

  useEffect(() => {
    let recetas = recipes && recipes;
    setCurrentPage(1)
    if (recetas.lenght === 0) {
      dispatch(emptyMessage())
      dispatch(getRecipes());
    }
  }, [recipes, dispatch]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage * recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const recipesToShow = recipes && recipes.slice(indexFirstRecipe, indexLastRecipe);


  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (recipesToShow) {
      setIsLoading(false);
    }
  }, [recipesToShow]);

  function handleEdit(id) {
    dispatch(emptyMessage())
    navigation(`/recipes/update/${id}`)
    }
  
    function handleDelete(id) {
    dispatch(emptyMessage())
    dispatch(deleteRecipe(id))
  }

  useEffect(() => {
    if (message) {
      if (typeof message === "string") {
        let mensaje = message;
        alert(mensaje);
        dispatch(emptyMessage())
      } else {
        let mensaje = message?.error;
        alert(mensaje);
        dispatch(emptyMessage())
      }
    }// eslint-disable-next-line
  }, [message]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>

          <Paginado
            recipesPerPage={recipesPerPage}
            recipes={recipes.length}
            paginado={paginado}
            currentPage={currentPage}
          />
          <div className={styles.recipes}>
            {recipesToShow ? (
              recipesToShow.map((r) => {
                return (
                  <Recipe
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    key={r.id && r.id}
                    id={r.id && r.id}
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
         <Paginado
            recipesPerPage={recipesPerPage}
            recipes={recipes.length}
            paginado={paginado}
            currentPage={currentPage}
          />
          </div>
      )}
     
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    diets: state.diets,
    message: state.message
  };
}

export default connect(mapStateToProps, null)(Recipes);
