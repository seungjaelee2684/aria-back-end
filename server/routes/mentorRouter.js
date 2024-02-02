const express = require('express');
const router = express.Router();
const Mentor = require('../Schemas/MentorsNameSchema');
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');
const jwt = require('jsonwebtoken');
const secretKey = require('../app/config/jwt');

// 강사 추가 api
router.post('/upload', imageUploader.fields([
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

    if (token) {
        async function verifyToken (token, secret) {
            try {
                const decoded = await jwt.verify(token, secret);
                console.log("토큰이 유효합니다.");
                console.log(decoded);
                res.status(201).json({
                    message: "토큰이 유효합니다.",
                    status: 201
                });
                return true;
            } catch (error) {
                console.error("토큰이 유효하지 않습니다.");
                res.status(400).json({
                    message: "토큰이 유효하지 않습니다.",
                    status: 400
                });
                return false;
            };
        };

        verifyToken(token, secretKey);

        try {
            const bannerImage = req.files['banner_image'][0].location;
            const nicknameImage = req.files['nickname_image'][0].location;
            const thumbnailImage = req.files['thumbnail_image'][0].location;
            const curriculumImages = req.files['curriculum_image'].map(file => file.location);
            const portfolioImages = req.files['portfolio_image'].map(file => file.location);

            const curriculumENG = curriculumImages?.slice(0, 2);
            const curriculumJPN = curriculumImages?.slice(3, 5);
            const curriculumKOR = curriculumImages?.slice(6, 8);

            const newDate = new Date();
            const year = newDate.getFullYear();
            const month = newDate.getMonth() + 1;
            const day = newDate.getDate();
            const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            console.log("bannerImage", bannerImage);
            console.log("nicknameImage", nicknameImage);
            console.log("thumbnailImage", thumbnailImage);
            console.log("curriculumImages", curriculumImages);
            console.log("portfolioImages", portfolioImages);
            console.log("curriculumENG", curriculumENG);
            console.log("curriculumJPN", curriculumJPN);
            console.log("curriculumKOR", curriculumKOR);
            console.log(date);

            const { englishname, chinesename, japanesename, nickname, nation } = req.body["mentorInfoData"];

            const { home, youtube, twitter, instagram, artstation, pixiv } = req.body["SNS"];

            // connection.query(
            //     `INSERT INTO banner_image (imageUrl) VALUES (${bannerImage})`
            // );

            // connection.query(
            //     `INSERT INTO nickname_image (imageUrl) VALUES (${nicknameImage})`
            // );

            // connection.query(
            //     `INSERT INTO thumbnail_image (imageUrl) VALUES (${thumbnailImage})`
            // );

            // connection.query(
            //     `INSERT INTO curriculum_image (imageUrl) VALUES (${curriculumImages})`
            // );

            // connection.query(
            //     `INSERT INTO portfolio_image (imageUrl) VALUES (${portfolioImages})`
            // );

            // connection.query(
            //     `INSERT INTO mentors (englishname, chinesename, japanesename, nickname, nation, createdAt, updatedAt)
            //     VALUES (?, ?, ?, ?, ?, ?, ?)`,
            //     [englishname, chinesename, japanesename, nickname, nation, date, date]
            // );

            // connection.query(
            //     `INSERT INTO links (home, youtube, twitter, instagram, artstation, pixiv)
            //     VALUES (?, ?, ?, ?, ?, ?)`,
            //     [home, youtube, twitter, instagram, artstation, pixiv]
            // );

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
});

// 강사 전체목록 조회 api
router.get('/', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    console.log(token);

    try {
        // const mentor_name = await Mentor.find();
        const mentorOfDates = mentor_name.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const page = req.query.page;
        const size = req.query.size;
        const nationstatus = req.query.nationstatus;

        const filterMentor = mentorOfDates?.filter((item) => {
            if (nationstatus === "All") {
                return item
            } else {
                return item?.nation === nationstatus
            }
        });

        const startIndex = size * (page - 1);
        const endIndex = (size * page) - 1;
        // const filterPageMentor = filterMentor.slice(startIndex, endIndex)
        const pageMentor = filterMentor.slice(startIndex, endIndex);

        const mentorListData = { mentorListData: pageMentor };
        // const filterMentorListData = { mentorListData: filterPageMentor };

        if (token) {
            res.status(200).json({
                message: "강사목록 조회 완료!",
                status: 200,
                isOperator: true,
                totalNumber: mentor_name.length,
                ...mentorListData
            });
        } else {
            res.status(200).json({
                message: "강사목록 조회 완료!",
                status: 200,
                isOperator: false,
                totalNumber: mentor_name.length,
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
    console.log(token);

    try {
        const mentorsId = req.params.mentorsId;
        console.log(mentorsId);

        // const mentorcurriculumENG = connection.query(
        //     `SELECT imageUrl FROM curriculum_image WHERE mentorsId = ${mentorsId} AND language = ENG`
        // );

        // const mentorcurriculumJPN = connection.query(
        //     `SELECT imageUrl FROM curriculum_image WHERE mentorsId = ${mentorsId} AND language = JPN`
        // );

        // const mentorcurriculumKOR = connection.query(
        //     `SELECT imageUrl FROM curriculum_image WHERE mentorsId = ${mentorsId} AND language = KOR`
        // );

        // const portfolioImage = connection.query(
        //     `SELECT imageUrl FROM curriculum_image WHERE mentorsId = ${mentorsId}`
        // );

        // const nickname = connection.query(
        //     `SELECT nickname FROM mentors WHERE mentorsId = ${mentorsId}`
        // );

        // const mentorData = {
        //     mentorsId: mentorsId,
        //     nickname: nickname,
        //     curriculumENG: mentorcurriculumENG,
        //     curriculumJPN: mentorcurriculumJPN,
        //     curriculumKOR: mentorcurriculumKOR,
        //     portfolio: portfolioImage,
        // };

        // const mentorData = {
        //     mentorsId: mentorsId,
        //     name: "캬하하"
        // };

        if (token) {
            res.status(200).json({
                message: "강사 조회 완료!",
                status: 200,
                isOperator: true,
                // mentorDetailData: mentorData
            });
        } else {
            res.status(200).json({
                message: "강사 조회 완료!",
                status: 200,
                isOperator: false,
                // mentorDetailData: mentorData
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

// 강사 슬라이드 배너 api
router.get('/banner', async function (req, res) {
    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    console.log(token);

    try {
        // const bannerImage = connection.query(
        //     `SELET * FROM banner_image
        //     OREDER BY mentorsId DESC
        //     LIMIT 6`
        // );

        // const nicknameImage = connection.query(
        //     `SELET * FROM nickname_image
        //     OREDER BY mentorsId DESC
        //     LIMIT 6`
        // );

        // const bannerData = { bannerImage: bannerImage, nicknameImage: nicknameImage };

        const bannerData = {
            name: "캬하하"
        }

        if (token) {
            res.status(200).json({
                message: "정보 조회 성공",
                status: 200,
                isOperator: true,
                mentorBannerData: bannerData
            });
        } else {
            res.status(200).json({
                message: "정보 조회 성공",
                status: 200,
                isOperator: false,
                mentorBannerData: bannerData
            });
        };

    } catch (error) {
        console.error(error);
        res.status(403).json({
            message: "정보 조회 실패...!",
            status: 403
        })
    };
});

module.exports = router;