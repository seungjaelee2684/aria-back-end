const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/', async function (req, res) {
    res.send(`notice`);
});

router.get('/', async function (req, res) {
    res.send(`notice`);
});

module.exports = router;