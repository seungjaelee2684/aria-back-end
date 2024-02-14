const express = require('express');
const router = express.Router();
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 정보수정 api
router.get('/mentor/:mentorsId', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    const mentorsId = req.params.mentorsId;

    try {
        const mentorInformation = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT mentors.*, banner_image.imageUrl AS bannerImage, nickname_image.imageUrl AS nicknameImage, thumbnail_image.imageUrl AS thumbnailImage
                FROM mentors
                INNER JOIN banner_image ON mentors.mentorsId = banner_image.mentorsId
                INNER JOIN nickname_image ON mentors.mentorsId = nickname_image.mentorsId
                INNER JOIN thumbnail_image ON mentors.mentorsId = thumbnail_image.mentorsId
                WHERE mentors.mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const mentorCurriculum = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT imageUrl
                FROM curriculum_image
                WHERE mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const mentorPortfolio = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT imageUrl
                FROM portfolio_image
                WHERE mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const mentorInfoData = { mentorInformation, mentorCurriculum, mentorPortfolio };

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
                            mentorInfoDto: mentorInfoData
                        });
                    } else {
                        res.status(400).json({
                            message: "토큰 만료...! 재인증 필요",
                            status: 400,
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
            res.status(400).json({
                message: "허가 되지 않은 요청...! 인증 필요",
                status: 400,
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

module.exports = router;