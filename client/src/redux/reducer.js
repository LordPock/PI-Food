const initialState = {
  recipes: [],
  allRecipes: [],
  detail: [],
  diets: [],
};

export default function reducerRecipe(state = initialState, action) {
  switch (action.type) {
    case "ADD_RECIPES":
      const all = action.payload.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      });
      return {
        ...state,
        allRecipes: all,
        recipes: all,
      };
    case "GET_DETAIL":
      return { ...state, detail: action.payload };
    case "GET_DIETS":
      return { ...state, diets: action.payload };
    case "SEARCH":
      return {
        ...state,
        recipes: state.allRecipes.filter((r) =>
          r.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "CREATE":
      const created = [...state.allRecipes, action.payload];
      return { ...state, allRecipes: [...created] };
    case "DELETE_RECIPE":
      const borrar = state.allRecipes.filter((r) => r.id !== action.payload);
      return { ...state, allRecipes: borrar, recipes: borrar };
    case "FILTER":
      let filtro = [];
      console.log(action.payload);
      for (const r of state.allRecipes) {
        for (const d of action.payload) {
          if (r.diets.includes(d.toLowerCase())) {
            if (!filtro.includes(r)) filtro.push(r);
          }
        }
      }
      return {
        ...state,
        recipes: filtro,
      };
    case "ORDER ALFABETICO":
      if (action.payload === "Ascendente") {
        const ordenado = [...state.recipes].sort((a, b) => a.title - b.title);
        return { ...state, recipes: ordenado };
      } else {
        const ordenado = [...state.recipes].sort((a, b) => b.title - a.title);
        return { ...state, recipes: ordenado };
      }
    case "ORDER HEALTH":
      if (action.payload === "Ascendente") {
        const ordenado = [...state.recipes].sort(
          (a, b) => a.healthScore - b.healthScore
        );
        return { ...state, recipes: ordenado };
      } else {
        const ordenado = [...state.recipes].sort(
          (a, b) => b.healthScore - a.healthScore
        );
        return { ...state, recipes: ordenado };
      }
    default:
      return state;
  }
}
