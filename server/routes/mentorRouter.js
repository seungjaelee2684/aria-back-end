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


// imageUploader.fields([
//     { name: "slideimage", maxCount: 3 },
//     { name: "thumbnail", maxCount: 1 },
//     { name: "curriculum", maxCount: 12 },
//     { name: "portfolio", maxCount: 15 },
// ]),


// 강사 추가 api
router.post('/upload', async function (req, res) {
    try {
        let mentor_id;
        let nowDate = Date.now;

        const idSelector = await connection.query(
            `SELECT * FROM mentor_table
            ORDER BY id DESC
            LIMIT 1`
        );

        mentor_id = (idSelector) ? idSelector[idSelector.length - 1].mentorsId + 1 : 1;

        // const slideImages = req.files['slideimage'].map(file => file.location);
        // const thumbnail = req.files['thumbnail'][0].location;
        // const curriculumImages = req.files['curriculum'].map(file => file.location);
        // const portfolioImages = req.files['portfolio'].map(file => file.location);

        const {
            englishname,
            chinesename,
            japanesename,
            nickname,
            nation,
        } = req.body.mentorInfoData;

        const { home, youtube, twitter, instagram, artstation, pixiv } = req.body.SNS;

        connection.query(
            `INSERT INTO mentor_table (mentorsId, englishname, chinesename, japanesename, nickname, nation, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [mentor_id, englishname, chinesename, japanesename, nickname, nation, nowDate, nowDate]
        );

        connection.query(
            `INSERT INTO SNS_table (mentorsId, home, youtube, twitter, instagram, artstation, pixiv)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [mentor_id, home, youtube, twitter, instagram, artstation, pixiv]
        );

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