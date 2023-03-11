require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5,} = process.env;

var recipe = [];
var key = 1

async function search(name) {
  const resultAPI = await searchAPI();
  const resultDB = await searchDB();
  recipe = await resultDB.concat(resultAPI);

  if (name) {
    let resultado = recipe?.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );
    if (resultado.length === 0)
      throw new Error("No existen recetas que incluyan esa palabra");
    return resultado;
  } else {
    return recipe;
  }
}

async function searchAPI() {

  const api = eval('API_KEY' + key)

  await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${api}`
    )
    .then((response) => (recipe = response.data.results))
    .catch((error) => {if(error.response.status === 402) {
      key === 5 ? key = 1 : key++
      searchAPI() }
    });
  return recipe;
}

async function searchDB() {
  let resultado = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: { attributes: [] },
    }
  });
  
  const recetas = [...resultado];

  return recetas;
}

module.exports = { search, searchAPI, searchDB };
