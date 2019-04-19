const express = require('express');
const router = express.Router();

const entityRouter = require('./entityRoutes');

router.use("/api", entityRouter);


module.exports = router;