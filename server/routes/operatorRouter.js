const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');
const SECRET_KEY = secretKey;

router.post('/', async function (req, res) {
    try {
        const authenticationKey = "C51G2E3D7AB2E6O70WF9Q5"
        const { password } = req.body;
        if (password === authenticationKey) {

            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign({
                type: "JWT",
                state: "Operator"
            }, SECRET_KEY, {
                expiresIn: "30m",
                issuer: "op"
            });

            res.cookie('jwt', token);
            res.status(200).json({
                status: 200,
                message: "토큰이 발급되었습니다."
            });

        } else {
            res.status(400).json({
                status: 400,
                message: "인증 실패...!!"
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("No authentication");
    };
});

module.exports = router;