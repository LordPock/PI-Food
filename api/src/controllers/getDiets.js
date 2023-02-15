const { Diet } = require("../db");

async function allDiets() {
  let dietas = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  let buscar = await Diet.findAll()
  if (!buscar) {
  try {
  for (const dieta of dietas) {
    let create = await Diet.create({ title: dieta });
  }
  } catch(error) {
    throw new Error(error.message)
  }
  let resultado = await Diet.findAll();

  return resultado;
}
return buscar
}

module.exports = allDiets;
