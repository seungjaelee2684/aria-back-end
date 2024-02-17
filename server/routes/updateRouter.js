const express = require('express');
const router = express.Router();
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 정보조회 api
router.get('/mentor/:mentorsId', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie?.substring(4);
    const mentorsId = req.params.mentorsId;

    try {
        const mentorInformation = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM mentors
                WHERE mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const socialLink = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT home, youtube, twitter, instagram, artstation, pixiv
                FROM links
                WHERE mentorsId = ?`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const mentorSingleImage = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT banner_image.imageUrl AS bannerImage, nickname_image.imageUrl AS nicknameImage, thumbnail_image.imageUrl AS thumbnailImage
                FROM banner_image
                INNER JOIN nickname_image ON banner_image.mentorsId = nickname_image.mentorsId
                INNER JOIN thumbnail_image ON banner_image.mentorsId = thumbnail_image.mentorsId
                WHERE banner_image.mentorsId = ?;`,
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
                FROM (
                    SELECT mentorsId, imageUrl FROM curriculum_image_ENG
                    UNION
                    SELECT mentorsId, imageUrl FROM curriculum_image_JPN
                    UNION
                    SELECT mentorsId, imageUrl FROM curriculum_image_KOR
                ) AS combined_images
                WHERE combined_images.mentorsId = ?;`,
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

        const mentorSingle = mentorSingleImage[0];

        const curriculumENG = mentorCurriculum?.filter((item) => item.imageUrl.includes("ENG"));
        const curriculumJPN = mentorCurriculum?.filter((item) => item.imageUrl.includes("JPN"));
        const curriculumKOR = mentorCurriculum?.filter((item) => item.imageUrl.includes("KOR"));

        const mentorInfoData = {
            mentorInfomation: mentorInformation[0],
            snsLinks: socialLink[0],
            mentorImage: {
                mentorSingle,
                mentorCurriculum: {
                    curriculumENG: curriculumENG,
                    curriculumJPN: curriculumJPN,
                    curriculumKOR: curriculumKOR
                },
                mentorPortfolio
            }
        };

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
                        res.status(401).json({
                            message: "토큰 만료...! 재인증 필요",
                            status: 401,
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
            res.status(401).json({
                message: "허가 되지 않은 요청...! 인증 필요",
                status: 401,
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