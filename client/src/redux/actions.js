const deploy = 'https://pi-food-kgyc.onrender.com'
const local = "http://localhost:3001"
const pivot = true



export function getRecipes() {
  return async (dispatch) => {
    await fetch((pivot ? deploy : local) + "/recipes")
      .then((r) => r.json())
      .then((data) =>
        dispatch({
          type: "GET_RECIPES",
          payload: data,
        })
      );
  };
}

export function findRecipe(id) {
  return async (dispatch) => {
    await fetch((pivot ? deploy : local) + `/recipes/${id}`)
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
    await fetch((pivot ? deploy : local) + "/diets")
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
    await fetch((pivot ? deploy : local) + "/recipes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "CREATE", payload: [recipe, result] });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
}

export function filterRecipes(filter) {
  return {
    type: "FILTER",
    payload: filter,
  };
}

export function sortRecipes(sort) {
  return {
    type: "ORDER",
    payload: sort,
  };
}

export function emptyDetail() {
  return {
    type: 'EMPTY_D',
    payload: null
  }
}

export function emptyMessage() {
  return {
    type: 'EMPTY_M',
    payload: null
  }
}

export function deleteRecipe(id) {
  return async (dispatch) => {
    await fetch((pivot ? deploy : local) + `/recipes/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "DELETE", payload: [id, result] });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
}

export function updateRecipe(recipe) {

  return async (dispatch) => {
    await fetch((pivot ? deploy : local) + `/recipes/update/${recipe.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify(recipe),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "UPDATE", payload: [recipe, result] });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
 
}