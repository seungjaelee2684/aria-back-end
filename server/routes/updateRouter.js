const express = require('express');
const router = express.Router();
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 정보수정 api
router.get('/update/mentor/:mentorsId', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    const mentorsId = req.params.mentorsId;

    try {
        const mentorInformation = await new Promise((resolve, reject) => {
            connection.query(
                ``,
                [],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        if (token) {
            async function verifyToken (token, secret) {
                try {
                    const decoded = await jwt.verify(token, secret);
                    return true;
                } catch (error) {
                    return false;
                };
            };

            verifyToken(token, secretKey)
                .then((isTokenValid) => {
                    if (isTokenValid) {
                        res.status(200).json({
                            message: "강사 정보 조회 성공!",
                            status: 200,
                            isOperator: true,
                        });
                    } else {
                        res.status(200).json({
                            message: "강사 정보 조회 성공!",
                            status: 200,
                            isOperator: false,
                        });
                    };
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({
                        message: "서버 오류...!",
                        status: 500
                    });
                });
        } else {
            res.status(200).json({
                message: "강사 정보 조회 성공!",
                status: 200,
                isOperator: false,
            });
        };
    } catch (error) {
        console.error(error);
        res.status(403).json({
            message: "강사 정보 조회 실패...!",
            status: 403
        });
    };
});