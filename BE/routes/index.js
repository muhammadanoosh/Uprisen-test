const express = require('express');
const router = express.Router();

// ALL ROUTES THAT ARE REQUIRED
const userRoute = require('./user.route');



// ROUTES
router.use('/user', userRoute);


module.exports = router;