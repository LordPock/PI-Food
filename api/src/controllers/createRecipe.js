const { Recipe, Diet } = require("../db");

async function createRecipe({
  title,
  summary,
  image,
  healthScore,
  instructions,
  diets,
}) {

  if (!title || !summary) throw new Error('El título y el resumen deben estar completos')
  
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
