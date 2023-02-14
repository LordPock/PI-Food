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

export function filterCards(status) {
  return {
    type: "FILTER",
    payload: status,
  };
}

export function orderCards(id) {
  return {
    type: "ORDER",
    payload: id,
  };
}
