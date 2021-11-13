const express = require('express')
const userRoutes = require('./userController');
const businessRoutes = require('./businessPackagesController')
const orderRoutes = require('./orderController');
const reviewRoutes = require('./reviewController');

let router = express.Router();

router.use('/users', userRoutes);
router.use('/businessPackages', businessRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes)

module.exports = router;