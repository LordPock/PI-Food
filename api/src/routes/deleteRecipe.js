const { Router } = require("express");
const  deleteRecipe = require('../controllers/deleteRecipe')
const express = require("express");

const router = Router();
router.use(express.json());

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  if (id.includes("-")) {
    try {
      let resultado = await deleteRecipe(id);
      res.status(200).json(`La receta con el ID ${id} se ha eliminado correctamente`);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else { res.status(200).json(`La receta con el ID ${id} se ha eliminado correctamente`);}
  
});

module.exports = router;
