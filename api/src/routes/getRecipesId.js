const { Router } = require("express");
const { searchId } = require('../controllers/getRecipesId')
const express = require("express");
const updateRecipe = require("../controllers/updateRecipe");


const router = Router();
router.use(express.json());


router.get("/:id", async (req, res) => {
  
  let { id } = req.params;

  try {
    if (id.includes('-') && id.length !== 36) throw new Error('El ID es inválido')
    let resultado = await searchId(id);
    res.status(200).json( resultado );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



module.exports = router;
