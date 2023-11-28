const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.get('/', (req, res)=>{
    if (req.cookies.count) {
        var count = parseInt(req.cookies.count);
    } else {
        var count = 0;
    };
    count = count + 1
    res.cookie('count', count);
    res.send('count : ' + count);
    // res.send({ test: "hi" });
});

module.exports = router;