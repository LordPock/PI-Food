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
        }
      });
      return { ...state, diets: dietas };

    case "SEARCH":
      if (action.payload) {
        const search = state.allRecipes.filter((r) =>
          r.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          recipes: search,
        };
      } else {
        const search = state.allRecipes;
        return {
          ...state,
          recipes: search,
        };
      }

    case "CREATE":
      const created = [...state.allRecipes, action.payload[0]];
      return { ...state, allRecipes: [...created], message: action.payload[1] };

    case "FILTER":
      if (action.payload.length > 0) {
      let filtro = [];
      for (const r of state.allRecipes) {
        for (const d of r.diets) {
          for (const a of action.payload) {
            d.title ? d.title?.toLowerCase().includes(a?.toLowerCase()) &&!filtro.includes(r) && filtro.push(r) : d.toLowerCase().includes(a.toLowerCase()) && !filtro.includes(r) && filtro.push(r);
            
          }
        }
      }
      return {
        ...state,
        recipes: filtro,
      };
    } else {
      return { ...state, recipes: state.allRecipes}
    }
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
      break;
    case "EMPTY_D":
      return { ...state, detail: action.payload };

    case "EMPTY_M":
      return { ...state, message: action.payload };

    case "DELETE":
      let borrado = state.allRecipes.filter((r) => r.id !== action.payload[0]);
      return {
        ...state,
        allRecipes: borrado,
        recipes: borrado,
        message: action.payload[1],
      };

    case "UPDATE":
      return {
        ...state,
        allRecipes: state.allRecipes.map((r) => {
          if (r.id === action.payload[0].id) {
            return action.payload[0];
          }
          return r;
        }),
        recipes: state.allRecipes,
        message: action.payload[1],
      };

    default:
      return state;
  }
}
