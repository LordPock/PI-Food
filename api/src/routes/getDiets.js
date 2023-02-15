const { Router } = require("express");
const express = require("express");
const allDiets = require("../controllers/getDiets");


const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    let resultado = await allDiets();
    res.status(200).json( resultado );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
