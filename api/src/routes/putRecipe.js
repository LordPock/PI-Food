const { Router } = require("express");
const  updateRecipe = require('../controllers/updateRecipe')
const express = require("express");

const router = Router();
router.use(express.json());

router.put("/:id", async (req, res) => {
    let { id } = req.params

  if (id.includes("-")) {
    try {
      let resultado = await updateRecipe(req.body);
      res.status(200).json(`La receta con el ID ${id} se ha actualizado correctamente en la base de datos`);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else { res.status(200).json(`La receta con el ID ${id} se ha actualizado correctamente`);}
  
});

module.exports = router;
