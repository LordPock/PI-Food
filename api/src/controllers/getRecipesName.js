require("dotenv").config();
const axios = require("axios");
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
      `https://api.spoonacular.com/recipes/complexSearch?number=10&addRecipeInformation=true&apiKey=${API_KEY}`
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
    // raw: true,
    // nest: true,
  });
  
  const recetas = [...resultado];

  // for (let i = 0; i < recetas?.length; i++) {
  //   for (let j = 1; j <= recetas?.length; j++) {
  //     if (recetas[i].id === recetas[j]?.id) {
  //       let aux = [];
  //       aux.push(recetas[i].diets.title);
  //       aux.push(recetas[j].diets.title);
  //       recetas[i].diets = [];
  //       for (const d of aux) {
  //       recetas[i].diets.push(d)
  //       }
  //       recetas.splice(j, 1);
  //     }
  //   }
  // }





  return recetas;
}

module.exports = { search, searchAPI, searchDB };
