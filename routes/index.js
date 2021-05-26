const express = require('express');

const router = express.Router();
console.log('Router loaded');

router.get('/', require('../controllers/home_controller').home);
router.use('/users', require('./users'));


module.exports = router;