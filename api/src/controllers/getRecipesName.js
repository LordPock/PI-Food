require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

var recipe = [];

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
  await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&apiKey=${API_KEY}`
    )
    .then((response) => (recipe = response.data.results));

  return recipe;
}

async function searchDB() {
  let resultado = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["title"],
      through: { attributes: [] },
    },
  });
  
  let objArray
 for (const r of resultado) {
    objArray = r.diets.map(d =>{
      return d.title
    })
    r.diets = objArray
  }
  
  return resultado;
}

module.exports = { search, searchAPI, searchDB };
