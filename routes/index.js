const express = require('express');
const router = express.Router();
const userRoutes = require('./user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat App' });
});

router.use('/api/v1', userRoutes)

module.exports = router;
