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