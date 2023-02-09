//require("dotenv").config();

const { Recipe, Diet } = require("../db");

async function createRecipe({
  title,
  summary,
  healthScore,
  instructions,
  diets,
}) {
  let resultado = await Recipe.create({
    title,
    summary,
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

  let algo = await Recipe.findOne({
    where: {
      title: title,
    },
    include: {
      model: Diet,
      attributes: ["title"],
      through: { attributes: [] },
    },
  });

}

module.exports = createRecipe;
