//require("dotenv").config();

const { Recipe } = require("../db");

async function createRecipe({ title, summary, healthScore, instructions }) {
  let resultado = await Recipe.create({
    title,
    summary,
    healthScore,
    instructions,
  });
  return resultado;
}

module.exports = createRecipe;
