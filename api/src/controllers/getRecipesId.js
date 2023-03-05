require("dotenv").config();
const axios = require("axios");
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

    // let objArray = resultado?.dataValues?.diets?.map(d =>{
    //   return d.title
    // })
    // resultado.dataValues.diets = objArray

    if (!resultado) throw new Error(`No existen recetas con ID ${id}`);
    return resultado;
  }
}

module.exports = { searchId };
