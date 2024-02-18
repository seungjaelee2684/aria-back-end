const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');
const SECRET_KEY = secretKey;
const PERMISSION = require('../app/config/permission');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res) {
    const permissionId = PERMISSION?.PERMISSION_IDS;
    const { operateId, password } = req?.body;
    const passwordMatch = await bcrypt.compare(password, await PERMISSION.hashPassword());
    try {
        if ((passwordMatch) && permissionId.includes(operateId)) {
            const jwtToken = jwt.sign({
                type: "JWT",
                state: "Operator"
            }, SECRET_KEY, {
                expiresIn: "1h",
                issuer: "op"
            });

            res.setHeader('Authorization', jwtToken);
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