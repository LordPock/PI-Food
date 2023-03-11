const { Router } = require("express");
const express = require("express");
const createRecipe = require("../controllers/createRecipe");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
 
  let { title, summary, image, healthScore, instructions, diets } = req.body;

  try {
    let resultado = await createRecipe({
      title,
      summary,
      image,
      healthScore,
      instructions,
      diets,
    });
    res.status(200).json(`Su receta se ha creado con éxito. \n\nGracias por compartirla!.`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
