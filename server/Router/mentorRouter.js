const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const mentorListData = [
    {
        id: "1",
        isready: false,
        nation: "Japan",
        englishname: "Shimanun",
        chinesename: "岛勋",
        japanesename: "しまぬん",
        nickname: "시마눈",
        isnew: false,
        slideimage: {
            status: "Left",
            bigger: false,
            background: "",
            nickname: ""
        },
        portfolio: [
            
        ],
        content: {
            englishcontent: [
                
            ],
            chinesecontent: [
                
            ],
            japanesecontent: [
                
            ],
            koreancontent: [
                
            ],
        },
        sns: [
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: "https://x.com/shimanunEO?s=20"
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            }
        ],
        image: ""
    },
    {
        id: "2",
        isready: false,
        nation: "Korea",
        englishname: "Haruri",
        chinesename: "岛勋",
        japanesename: "しまぬん",
        nickname: "하루리",
        isnew: false,
        slideimage: {
            status: "Left",
            bigger: false,
            background: "",
            nickname: ""
        },
        portfolio: [
            
        ],
        content: {
            englishcontent: [
                
            ],
            chinesecontent: [
                
            ],
            japanesecontent: [
                
            ],
            koreancontent: [
                
            ],
        },
        sns: [
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: "https://x.com/shimanunEO?s=20"
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            }
        ],
        image: ""
    },
    {
        id: "3",
        isready: false,
        nation: "Japan",
        englishname: "Sanpati",
        chinesename: "岛勋",
        japanesename: "しまぬん",
        nickname: "산파치",
        isnew: false,
        slideimage: {
            status: "Left",
            bigger: false,
            background: "",
            nickname: ""
        },
        portfolio: [
            
        ],
        content: {
            englishcontent: [
                
            ],
            chinesecontent: [
                
            ],
            japanesecontent: [
                
            ],
            koreancontent: [
                
            ],
        },
        sns: [
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: "https://x.com/shimanunEO?s=20"
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            }
        ],
        image: ""
    },
    {
        id: "4",
        isready: false,
        nation: "Japan",
        englishname: "Escape",
        chinesename: "岛勋",
        japanesename: "しまぬん",
        nickname: "이스케이프",
        isnew: false,
        slideimage: {
            status: "Left",
            bigger: false,
            background: "",
            nickname: ""
        },
        portfolio: [
            
        ],
        content: {
            englishcontent: [
                
            ],
            chinesecontent: [
                
            ],
            japanesecontent: [
                
            ],
            koreancontent: [
                
            ],
        },
        sns: [
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: "https://x.com/shimanunEO?s=20"
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            },
            {
                icon: "",
                link: ""
            }
        ],
        image: ""
    }
];

router.get('/', function (req, res) {
    res.send(mentorListData);
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