require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

var recipe = [];

async function searchId(id) {
  let buscar = id.includes("-");

  if (!buscar) {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
      .then((response) => (recipe = response.data));
    let receta = {
      title: recipe.title,
      image: recipe.image,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets,
      summary: recipe.summary.replace(/(<([^>]+)>)/ig, ''),
      instructions: recipe.instructions.replace(/(<([^>]+)>)/ig, ''),
      healthScore: recipe.healthScore,
    };
    if (recipe?.length === 0)
      throw new Error(`No existen recetas con ID ${id}`);

    return receta;
  } else {
    let resultado = await Recipe.findOne({
      where: {
        id: id,
      },
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
  
    if (!resultado)
      throw new Error(`No existen recetas con ID ${id}`);
    return resultado;
  }
}

module.exports = { searchId };
