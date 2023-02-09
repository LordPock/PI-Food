require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe } = require("../db");
const { API_KEY } = process.env;

var recipe = [];

async function searchId(id) {
  if (id) {
    const resultAPI = await searchIdAPI(id);
    const resultDB = await searchIdDB(id);
    recipe = await resultDB.concat(resultAPI);
    if (recipe.length === 0) throw new Error(`No existen recetas con ID ${id}`);
    return recipe;
  } else {
    throw new Error("No se envió in ID válido");
  }
}

async function searchIdAPI(id) {
  await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information&apiKey=${API_KEY}`
    )
    .then((response) => (recipe = response.data.results));

  return recipe;
}

async function searchIdDB(id) {
  let resultado = await Recipe.findByPk(id);
  return resultado;
}

module.exports = { searchId, searchIdAPI, searchIdDB };
