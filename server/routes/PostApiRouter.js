const express = require('express');
const router = express.Router();
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 추가 api
router.post('api/mentors/upload', imageUploader.fields([
    { name: "banner_image", maxCount: 1 },
    { name: "nickname_image", maxCount: 1 },
    { name: "thumbnail_image", maxCount: 1 },
    { name: "curriculum_image", maxCount: 12 },
    { name: "portfolio_image", maxCount: 15 },
    { name: "mentorInfoData" },
    { name: "SNS" }
]), async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    console.log(token);

    console.log(req.body["mentorInfoData"], req.body["SNS"]);
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
                    try {
                        const bannerImage = req.files['banner_image'][0].location;
                        const nicknameImage = req.files['nickname_image'][0].location;
                        const thumbnailImage = req.files['thumbnail_image'][0].location;
                        const curriculumImages = req.files['curriculum_image'].map(file => file.location);
                        const portfolioImages = req.files['portfolio_image'].map(file => file.location);
            
                        const { englishname, chinesename, japanesename, nickname, nation, opendate } = JSON.parse(req.body["mentorInfoData"]);
                        const { home, youtube, twitter, instagram, artstation, pixiv } = JSON.parse(req.body["SNS"]);

                        const newDate = new Date();
                        const year = newDate.getFullYear();
                        const month = newDate.getMonth() + 1;
                        const day = newDate.getDate();
                        const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        const curriculumENG = curriculumImages.filter((image) => image.includes("ENG"));
                        const curriculumJPN = curriculumImages.filter((image) => image.includes("JPN"));
                        const curriculumKOR = curriculumImages.filter((image) => image.includes("KOR"));

                        console.log(curriculumENG, curriculumJPN, curriculumKOR);
                        
                        connection.query(
                            `INSERT INTO mentors (englishname, chinesename, japanesename, nickname, nation, opendate, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                            [englishname, chinesename, japanesename, nickname, nation, opendate, date, date],
                            async function (error, results, fields) {
                                if (error) throw error;
                                console.log("Inserted successfully");

                                const mentorsId = results.insertId;

                                connection.query(
                                    `INSERT INTO links (mentorsId, home, youtube, twitter, instagram, artstation, pixiv) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                                    [mentorsId, home, youtube, twitter, instagram, artstation, pixiv],
                                    function (error, results, fields) {
                                        if (error) throw error;
                                        console.log("Inserted successfully");
                                    }
                                );
        
                                connection.query(
                                    `INSERT INTO banner_image (mentorsId, imageUrl) VALUES (?, ?);`,
                                    [mentorsId, bannerImage],
                                    function (error, results, fields) {
                                        if (error) throw error;
                                        console.log("Inserted successfully");
                                    }
                                );
                    
                                connection.query(
                                    `INSERT INTO nickname_image (mentorsId, imageUrl) VALUES (?, ?);`,
                                    [mentorsId, nicknameImage],
                                    function (error, results, fields) {
                                        if (error) throw error;
                                        console.log("Inserted successfully");
                                    }
                                );
                    
                                connection.query(
                                    `INSERT INTO thumbnail_image (mentorsId, imageUrl) VALUES (?, ?);`,
                                    [mentorsId, thumbnailImage],
                                    function (error, results, fields) {
                                        if (error) throw error;
                                        console.log("Inserted successfully");
                                    }
                                );

                                curriculumENG.forEach((imageUrl) => {
                                    connection.query(
                                        `INSERT INTO curriculum_image (mentorsId, imageUrl, languageData) VALUES (?, ?, ?);`,
                                        [mentorsId, imageUrl, "ENG"],
                                        function (error, results, fields) {
                                            if (error) throw error;
                                            console.log("Inserted successfully");
                                        }
                                    );
                                });

                                curriculumJPN.forEach((imageUrl) => {
                                    connection.query(
                                        `INSERT INTO curriculum_image (mentorsId, imageUrl, languageData) VALUES (?, ?, ?);`,
                                        [mentorsId, imageUrl, "JPN"],
                                        function (error, results, fields) {
                                            if (error) throw error;
                                            console.log("Inserted successfully");
                                        }
                                    );
                                });
        
                                curriculumKOR.forEach((imageUrl) => {
                                    connection.query(
                                        `INSERT INTO curriculum_image (mentorsId, imageUrl, languageData) VALUES (?, ?, ?);`,
                                        [mentorsId, imageUrl, "KOR"],
                                        function (error, results, fields) {
                                            if (error) throw error;
                                            console.log("Inserted successfully");
                                        }
                                    );
                                });
        
                                portfolioImages.forEach((imageUrl) => {
                                    connection.query(
                                        `INSERT INTO portfolio_image (mentorsId, imageUrl) VALUES (?, ?);`,
                                        [mentorsId, imageUrl],
                                        function (error, results, fields) {
                                            if (error) throw error;
                                            console.log("Inserted successfully");
                                        }
                                    );
                                });  
                            }
                        );

                        // connection.end();
            
                        res.status(200).json({
                            message: "업로드 성공!",
                            status: 200
                        });
                    } catch (error) {
                        console.error(error);
                        res.status(403).json({
                            message: "업로드 실패...!",
                            status: 403
                        });
                    };
                } else {
                    res.status(400).json({
                        message: "토큰 인증 실패...!",
                        status: 400
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
            message: "토큰 인증 실패...!",
            status: 400
        });
    };
});