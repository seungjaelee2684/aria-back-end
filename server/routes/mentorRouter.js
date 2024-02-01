const express = require('express');
const router = express.Router();
const Mentor = require('../Schemas/MentorsNameSchema');
const imageUploader = require('../database/S3storage');
const connection = require('../database/MySQL');

// const mentor_name = Mentor.find();
// let result = mentor_name;
// const id_data = Number(mentor_name[result.length - 1].mentorsId) + 1;
// const nextId = String(id_data);

// const imageUploader = createImageUploader(nextId);





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
    try {
        const {
            banner_image,
            nickname_image,
            thumbnail_image,
            curriculum_image,
            portfolio_image
        } = req.files;

        const newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        
        console.log("image error!!!", banner_image);
        console.log(date);
        
        // const idSelector = await connection.query(
        //     `SELECT * FROM mentor_table
        //     ORDER BY id DESC
        //     LIMIT 1`
        // );

        // mentor_id = (idSelector) ? idSelector[idSelector.length - 1].mentorsId + 1 : 1;

        // const bannerImage = banner_image[0].location;
        // const nicknameImage = nickname_image[0].location;
        // const thumbnailImage = thumbnail_image[0].location;
        // const curriculumImages = curriculum_image.map(file => file.location);
        // const portfolioImages = portfolio_image.map(file => file.location);

        const { englishname, chinesename, japanesename, nickname, nation } = req.body["mentorInfoData"];

        const { home, youtube, twitter, instagram, artstation, pixiv } = req.body["SNS"];

        // connection.query(
        //     `INSERT INTO banner_image (imageUrl) VALUES (?)`,
        //     [bannerImage]
        // );

        // connection.query(
        //     `INSERT INTO nickname_image (imageUrl) VALUES (?)`,
        //     [nicknameImage]
        // );

        // connection.query(
        //     `INSERT INTO thumbnail_image (imageUrl) VALUES (?)`,
        //     [thumbnailImage]
        // );

        // connection.query(
        //     `INSERT INTO curriculum_image (imageUrl) VALUES (?)`,
        //     [curriculumImages]
        // );

        // connection.query(
        //     `INSERT INTO portfolio_image (imageUrl) VALUES (?)`,
        //     [portfolioImages]
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
        res.status(500).send('Internal Server Error');
    };
});

// 강사 전체목록 조회 api
router.get('/', async function (req, res) {

    const requestCookie = req.headers.cookie;
    const token = requestCookie.substring(4);
    console.log(token);

    try {
        const mentor_name = await Mentor.find();
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
        const mentor_name = await Mentor.find();
        let mentorsId = req.params.mentorsId;
        const mentorFilterList = mentor_name?.filter((item) => item.mentorsId === mentorsId);

        if (token) {
            res.status(200).json({
                message: "강사 조회 완료!",
                status: 200,
                isOperator: true,
                mentorOneData: mentorFilterList[0]
            });
        } else {
            res.status(200).json({
                message: "강사 조회 완료!",
                status: 200,
                isOperator: false,
                mentorOneData: mentorFilterList[0]
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