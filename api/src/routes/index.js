const { Router } = require('express');

const countries = require('./countries')
const postActivity = require('./postActivity')
const continents = require('./continents');
const activities= require('./activities');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries)
router.use('/postActivity', postActivity)
router.use('/continents', continents)
router.use('/activities', activities )

module.exports = router;
