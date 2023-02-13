const { Router } = require("express");
const { search } = require("../controllers/getRecipesName");
const express = require("express");


const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    let resultado = await search(name);
    res.status(200).json( resultado );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
