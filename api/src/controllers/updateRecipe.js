const { Recipe, Diet } = require("../db");

async function updateRecipe(recipe) {

  let resultado = await Recipe.update(recipe, {
    where: {
        id: recipe.id
    },
    include: {
      model: Diet,
      attributes: ["title"],
      through: { attributes: [] },
    },
  });

 return resultado
}

module.exports = updateRecipe;