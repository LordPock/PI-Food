const initialState = {
    recipes: [],
    allRecipes: [],
    detail: []
}

export default function reducerRecipe(state = initialState, action) {
    switch (action.type) {
        case 'ADD_RECIPES':
            const all = action.payload
            return {...state, allRecipes: all.sort((a,b) => a.id - b.id), recipes: all.sort((a,b) => a.id - b.id)}
        case 'GET_DETAIL':
            //const recipeDetail = action.payload 
            return {...state, detail: action.payload}
        case 'DELETE_RECIPE':
            const borrar = state.allRecipes.filter(r => r.id !== action.payload)
            return {...state, allRecipes: borrar, recipes: borrar}
        case 'FILTER':
            if(action.payload !== 'All') {
                return {...state, recipes: state.allRecipes.filter(r => r.diets === action.payload)}
            } else {
                return {...state, recipes: state.allRecipes}
            }
        case 'ORDER ALFABETICO':
            if (action.payload === 'Ascendente') {
                const ordenado = [...state.recipes].sort((a,b) => a.title - b.title)
                return {...state, recipes: ordenado }
            } else {
                const ordenado = [...state.recipes].sort((a,b) => b.title - a.title)
                return {...state, recipes: ordenado } 
            }
         case 'ORDER HEALTH':
                if (action.payload === 'Ascendente') {
                    const ordenado = [...state.recipes].sort((a,b) => a.healthScore - b.healthScore)
                    return {...state, recipes: ordenado }
                } else {
                    const ordenado = [...state.recipes].sort((a,b) => b.healthScore - a.healthScore)
                    return {...state, recipes: ordenado } 
                }   
        default:
            return state
    }
}