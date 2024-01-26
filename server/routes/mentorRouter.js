const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const db = require('../lib/index');
const mentorListData = require('../lib/mentor');

router.use(cookieParser());

router.get('/', function (req, res) {
    // db.query('SELECT * from Users', (error, results, fields) => {
    //     if (error) throw error;
    //     console.log('User info is: ', results);
    //     res.send(results);
    // });
    res.json(mentorListData);
});

router.get('/:mentorsId', function (req, res) {
    let mentorsId = req.params.mentorsId;
    const mentorFilter = mentorListData?.filter((item) => item.id === mentorsId);
    res.send(mentorFilter);
});

// var products = {
//     1: {title : 'The history of web 1'},
//     2: {title : 'The next web'}
// };

// router.get('/', cors(corsOptions), function (req, res) {
//     var output = '';
//     for (var name in products) {
//         output += `
//             <li>
//                 <a href="/cart/${name}">${products[name].title}</a>
//             </li>
//         `
//         // console.log(products[name].title);
//     }
//     res.send(`
//         <h1>Products</h1>
//         <ul>${output}</ul>
//         <a href="/cart">Cart</a>
//     `);
// });

/*
cart = {
    1: 1,
    2: 1
}
*/

// router.get('/cart/:id', cors(corsOptions), function (req, res) {
//     var id = req.params.id;
//     if (req.cookies.cart) {
//         var cart = req.cookies.cart;
//     } else {
//         var cart = {};
//     };
//     if (!cart[id]) {
//         cart[id] = 0;
//     }
//     cart[id] = parseInt(cart[id]) + 1;
//     res.cookie('cart', cart);
//     res.redirect('/cart');
// });

// router.get('/cart', cors(corsOptions), function (req, res) {
//     var cart = req.cookies.cart;
//     if (!cart) {
//         res.send('Empty!');
//     } else {
//         var output = '';
//         for (var id in cart) {
//             output += `
//                 <li>
//                     ${products[id].title} (${cart[id]})
//                 </li>
//             `;
//         };
//     };
//     res.send(`
//         <h1>Cart</h1>
//         <ul>${output}</ul>
//         <a href="/">Product</a>
//         <a href="/delete">Delete</a>
//     `);
//     res.json(output);
// });

// router.get('/delete', function (req, res) {
//     if (req.cookies.cart) {
//         res.clearCookie('cart');
//     } else {

//     };
//     res.redirect('/');
// });

// router.get('/', (req, res)=>{
//     if (req.cookies.count) {
//         var count = parseInt(req.cookies.count);
//     } else {
//         var count = 0;
//     };
//     count = count + 1
//     res.cookie('count', count);
//     res.send('count : ' + count);
//     // res.send({ test: "hi" });
// });

module.exports = router;