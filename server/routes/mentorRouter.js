const express = require('express');
const router = express.Router();
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 전체목록 조회 api
router.get('/', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const nationstatus = req.query.nationstatus;
    const startIndex = parseInt(size * (page - 1));
    const newDate = new Date();

    try {
        const mentorInfo = await new Promise((resolve, reject) => {
            connection.query(
                `${(nationstatus === "All")
                    ? `SELECT mentors.*, thumbnail_image.imageUrl
                        FROM mentors
                        INNER JOIN thumbnail_image ON mentors.mentorsId = thumbnail_image.mentorsId
                        ORDER BY mentors.mentorsId DESC
                        LIMIT ?, ?;`
                    : `SELECT mentors.*, thumbnail_image.imageUrl
                        FROM mentors
                        INNER JOIN thumbnail_image ON mentors.mentorsId = thumbnail_image.mentorsId
                        WHERE mentors.nation = ?
                        ORDER BY mentors.mentorsId DESC
                        LIMIT ?, ?;`}`,
                (nationstatus === "All") ? [startIndex, size] : [nationstatus, startIndex, size],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            )
        });

        const total = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) AS total_rows FROM mentors;`,
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const mentorData = mentorInfo.map((item) => {
            const targetDate = new Date(item?.opendate);
            if (newDate >= targetDate) {
                return {...item, isopen: true};
            } else {
                return {...item, isopen: false};
            };
        });

        const mentorListData = { mentorListData: mentorData };

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
                            message: "강사목록 조회 완료!",
                            status: 200,
                            isOperator: true,
                            totalNumber: total[0].total_rows,
                            ...mentorListData
                        });
                    } else {
                        res.status(200).json({
                            message: "강사목록 조회 완료!",
                            status: 200,
                            isOperator: false,
                            totalNumber: total[0].total_rows,
                            ...mentorListData
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
                message: "강사목록 조회 완료!",
                status: 200,
                isOperator: false,
                totalNumber: total[0].total_rows,
                ...mentorListData
            });
        };
    } catch (error) {
        console.error(error);
        res.status(403).json({
            message: "Set the page and filter settings correctly and try again.",
            status: 403
        });
    };
});

// 강사 상세조회 api
router.get('/:mentorsId', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    const mentorsId = req.params.mentorsId;

    try {
        const curriculum = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT imageUrl, languageData
                FROM curriculum_image
                WHERE mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const portfolio = await new Promise((resolve, reject) => {
            connection.query(
                `SELECT imageUrl FROM portfolio_image
                WHERE mentorsId = ?;`,
                [mentorsId],
                async function (error, results, fields) {
                    if (error) throw error;
                    resolve(results);
                }
            );
        });

        const imageENG = curriculum.filter((item) => item.languageData === "ENG").map((item) => item.imageUrl);
        const imageJPN = curriculum.filter((item) => item.languageData === "JPN").map((item) => item.imageUrl);
        const imageKOR = curriculum.filter((item) => item.languageData === "KOR").map((item) => item.imageUrl);
        const portfolioImages = portfolio.map((item) => item.imageUrl);

        const mentorDetailData = {
            mentorsId: mentorsId,
            mentorDetailData: {
                mentorCurriculum: {
                    ENG: imageENG,
                    JPN: imageJPN,
                    KOR: imageKOR
                },
                mentorPortfolio: portfolioImages
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
                            message: "강사 조회 완료!",
                            status: 200,
                            isOperator: true,
                            ...mentorDetailData
                        });
                    } else {
                        res.status(200).json({
                            message: "강사 조회 완료!",
                            status: 200,
                            isOperator: false,
                            ...mentorDetailData
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
                message: "강사 조회 완료!",
                status: 200,
                isOperator: false,
                ...mentorDetailData
            });
        };
    } catch (error) {
        console.error(error);
        res.status(403).json({
            message: "강사 조회 실패...!",
            status: 403
        });
    };
});

module.exports = router;