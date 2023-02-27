const initialState = {
  recipes: [],
  allRecipes: [],
  detail: null,
  diets: [],
  message: null,
};

export default function reducerRecipe(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
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
      const dietas = action.payload.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }})
      return { ...state, diets: dietas };
    case "SEARCH":
      return {
        ...state,
        recipes: state.allRecipes.filter((r) =>
          r.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "CREATE":
      const created = [...state.allRecipes, action.payload[0]];
      return { ...state, allRecipes: [...created], message: action.payload[1] };
    case "DELETE_RECIPE":
      const borrar = state.allRecipes.filter((r) => r.id !== action.payload);
      return { ...state, allRecipes: borrar, recipes: borrar };
    case "FILTER":
      let filtro = [];
      for (const r of state.allRecipes) {
        for (const d of r.diets) {
          for (const a of action.payload) {
            if (d.toLowerCase().includes(a.toLowerCase())) {
              if (!filtro.includes(r)) filtro.push(r);
            }
          }
        }
      }
      return {
        ...state,
        recipes: filtro,
      };
    case "ORDER":
      if (action.payload === "AASC") {
        const ordenado = [...state.recipes].sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        return { ...state, recipes: ordenado };
      }
      if (action.payload === "ADSC") {
        const ordenado = [...state.recipes].sort((a, b) => {
          if (b.title.toLowerCase() > a.title.toLowerCase()) {
            return 1;
          } else {
            return -1;
          }
        });
        return { ...state, recipes: ordenado };
      }
      if (action.payload === "HASC") {
        const ordenado = [...state.recipes].sort(
          (a, b) => a.healthScore - b.healthScore
        );
        return { ...state, recipes: ordenado };
      }
      if (action.payload === "HDSC") {
        const ordenado = [...state.recipes].sort(
          (a, b) => b.healthScore - a.healthScore
        );
        return { ...state, recipes: ordenado };
      }
    case "EMPTY_D":
      return { ...state, detail: action.payload };
    case "EMPTY_M":
      return { ...state, message: action.payload };

    default:
      return state;
  }
}
