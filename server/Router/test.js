const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

var products = {
    1:{title : 'The history of web 1'},
    2:{title : 'The next web'}
};

router.get('/products', function (req, res) {
    for (var name in products) {
        console.log(products[name].title);
    }
    res.send('Products');
});

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