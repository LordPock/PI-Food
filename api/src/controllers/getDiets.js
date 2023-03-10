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

  let buscar = await Diet.findAll();

  if (buscar.length === 0) {
    for (const dieta of dietas) {
      let create = await Diet.create({ title: dieta });
    }

    let resultado = await Diet.findAll();
    return resultado;
  }
  return buscar;
}

module.exports = allDiets;
