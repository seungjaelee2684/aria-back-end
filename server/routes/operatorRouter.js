const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');
const SECRET_KEY = secretKey;

router.post('/', async function (req, res) {
    try {
        const authenticationKey = "C51G2E3D7AB2E6O70WF9Q5"
        const { operateId, password } = req.body;
        const permissionId = ["sean2684", "alsrb123"]
        if (password === authenticationKey && permissionId.includes(operateId)) {

            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const jwtToken = jwt.sign({
                type: "JWT",
                state: "Operator"
            }, SECRET_KEY, {
                expiresIn: "1h",
                issuer: "op"
            });

            res.cookie('jwt', jwtToken);
            res.status(200).json({
                message: "토큰이 발급되었습니다.",
                status: 200
            });

        } else {
            res.status(403).json({
                message: "인증 실패...!!",
                status: 403
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "No authentication",
            status: 500
        });
    };
});

module.exports = router;