const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const getRecipesRouter = require("./getRecipes");
const postRecipesRouter = require("./postRecipes");
const getRecipesIdRouter = require("./getRecipesId");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", getRecipesRouter);
router.use("/recipes", postRecipesRouter);
router.use("/recipes/:id", getRecipesIdRouter);

module.exports = router;
