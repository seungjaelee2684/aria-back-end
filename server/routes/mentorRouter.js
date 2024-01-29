const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const Mentor = require('../Schemas/MentorsNameSchema');

router.use(cookieParser());

router.post('/', async function (req, res) {
    try {
        const mentor_name = await Mentor.find();
        let result = mentor_name;
        const id_data = Number(mentor_name[result.length - 1].mentorsId) + 1;
        const nextId = String(id_data);
        const createdAt = new Date();

        const {
            englishname,
            chinesename,
            japanesename,
            nickname,
            nation
        } = req.body;

        const mentorsData = {
            mentorsId: nextId,
            englishname: englishname,
            chinesename: chinesename,
            japanesename: japanesename,
            nickname: nickname,
            nation: nation,
            createdAt: createdAt,
            updatedaAt: createdAt
        };

        const createdMentor = await Mentor.create(mentorsData);

        result.push(mentorsData);

        const mentor = { mentorList: result }
        res.json(mentor);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
});

router.get('/', async function (req, res) {
    try {
        const mentor_name = await Mentor.find();
        const mentorOfDates = mentor_name.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const page = req.query.page;
        const size = req.query.size;
        const nationstatus = req.query.nationstatus;

        const filterMentor = mentorOfDates?.filter((item) => item?.nation === nationstatus);

        const startIndex = size * (page - 1);
        const endIndex = (size * page) - 1;
        const filterPageMentor = filterMentor.slice(startIndex, endIndex);
        const pageMentor = mentorOfDates.slice(startIndex, endIndex);

        const mentorListData = { mentorListData: pageMentor };
        const filterMentorListData = { mentorListData: filterPageMentor };

        if (nationstatus === "All") {
            res.json(mentorListData);
        } else {
            res.json(filterMentorListData);
        }; 
    } catch (error) {
        console.error(error);
        res.status(403).send('Please set the page and filter settings correctly and try again.');
    };
    
});

router.get('/:mentorsId', function (req, res) {
    let mentorsId = req.params.mentorsId;
    const mentorFilter = mentorListData?.filter((item) => item.id === mentorsId);
    res.send(mentorFilter);
});

module.exports = router;