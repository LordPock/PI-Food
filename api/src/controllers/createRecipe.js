//require("dotenv").config();

const { Recipe, Diet } = require("../db");

async function createRecipe({
  title,
  summary,
  image,
  healthScore,
  instructions,
  diets,
}) {
  let resultado = await Recipe.create({
    title,
    summary,
    image,
    healthScore,
    instructions,
  });

  for (const diet of diets) {
    let dieta = await Diet.findOne({
      where: {
        title: diet,
      },
    });

    await resultado.addDiet(dieta);
  }



}

module.exports = createRecipe;
