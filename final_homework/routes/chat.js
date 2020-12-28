const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middlewares/isAuth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('chat', {})
});

module.exports = router;