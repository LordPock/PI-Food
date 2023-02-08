const { Router } = require("express");
const { searchId } = require('../controllers/getRecipesId')
const express = require("express");


const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let { id } = req.params;

  try {
    let resultado = await searchId(id);
    res.status(200).json({ resultado });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
