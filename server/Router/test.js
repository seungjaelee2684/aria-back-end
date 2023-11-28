const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

var products = {
    1:{title : 'The history of web 1'},
    2:{title : 'The next web'}
};

router.get('/products', function (req, res) {
    var output = '';
    for (var name in products) {
        output += `
            <li>
                <a href="/cart/${name}">${products[name].title}</a>
            </li>
        `
        // console.log(products[name].title);
    }
    res.send(`
        <h1>Products</h1>
        <ul>${output}</ul>
        <a href="/cart">Cart</a>
    `);
});

/*
cart = {
    1: 1,
    2: 1
}
*/

router.get('/cart/:id', function (req, res) {
    var id = req.params.id;
    if (req.cookies.cart) {
        var cart = req.cookies.cart;
    } else {
        var cart = {};
    };
    if (!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;
    res.cookie('cart', cart);
    res.redirect('/cart');
});

router.get('/cart', function (req, res) {
    var cart = req.cookies.cart;
    if (!cart) {
        res.rend('Empty!');
    } else {
        var output = '';
        for (var id in cart) {
            output += `
                <li>
                    ${products[id].title} (${cart[id]})
                </li>
            `;
        };
    };
    res.send(`
        <h1>Cart</h1>
        <ul>${output}</ul>
        <a href="/products">Product</a>
    `);
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