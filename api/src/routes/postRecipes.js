const { Router } = require("express");
const express = require("express");
const createRecipe = require("../controllers/createRecipe");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  let { title, summary, healthScore, instructions } = req.body;

  try {
    let resultado = await createRecipe({
      title,
      summary,
      healthScore,
      instructions,
    });
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
