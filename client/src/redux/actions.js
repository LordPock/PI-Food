export function addRecipes() {
  return async (dispatch) => {
    await fetch("http://localhost:3001/recipes")
      .then((r) => r.json())
      .then((data) =>
        dispatch({
          type: "ADD_RECIPES",
          payload: data,
        })
      );
  };
}

export function findRecipe(id) {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/recipes/${id}`)
      .then((r) => r.json())
      .then((data) =>
        dispatch({
          type: "GET_DETAIL",
          payload: data,
        })
      );
  };
}

export function addDiets() {
  return async (dispatch) => {
    await fetch("http://localhost:3001/diets")
      .then((r) => r.json())
      .then((data) => 
        dispatch({
          type: "GET_DIETS",
          payload: data,
        })
  )
  };
}

export function searchRecipe(title) {
  return {
    type: "SEARCH",
    payload: title,
  };
}

export function createRecipe(recipe) {
  return async (dispatch) => {
    await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "CREATE", payload: recipe });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
}

export function filterRecipe(filter) {
  return {
    type: "FILTER",
    payload: filter,
  };
}
