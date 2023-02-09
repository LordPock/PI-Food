const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const getRecipesRouter = require("./getRecipes");
const postRecipesRouter = require("./postRecipes");
const getRecipesIdRouter = require("./getRecipesId");
const getDietsRouter = require("./getDiets");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", getRecipesRouter);
router.use("/recipes", postRecipesRouter);
router.use("/recipes/:id", getRecipesIdRouter);
router.use("/diets", getDietsRouter);



module.exports = router;
