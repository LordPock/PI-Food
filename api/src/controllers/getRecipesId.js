require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5,} = process.env;

var recipe = [];
var key = 1

async function searchId(id) {
  const api = eval('API_KEY' + key)
  let buscar = id.includes("-");

  if (!buscar) {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${api}`
      )
      .then((response) => (recipe = response.data))
      .catch((error) => {if(error.response.status === 402) {
        key === 5 ? key = 1 : key++
        searchAPI(id) }
      });

    let receta = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets,
      summary: recipe.summary.replace(/(<([^>]+)>)/gi, ""),
      instructions: recipe.instructions.replace(/(<([^>]+)>)/gi, ""),
      healthScore: recipe.healthScore,
    };
    if (recipe?.length === 0)
      throw new Error(`No existen recetas con ID ${id}`);

    return receta;
  } else {

    let resultado = await Recipe.findByPk(id, {

      include: {
        model: Diet,
        attributes: ["title"],
        through: { attributes: [] },
      },
    });

    if (!resultado) throw new Error(`No existen recetas con ID ${id}`);
    return resultado;
  }
}

module.exports = { searchId };
