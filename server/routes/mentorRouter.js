const express = require('express');
const router = express.Router();
let db;
const cookieParser = require('cookie-parser');
const mentorListData = require('../lib/mentor');
const Mentor = require('../Schemas/MentorsNameSchema');

router.use(cookieParser());

router.post('', async function (req, res) {
    try {
        const mentor_name = await Mentor.find();
        let result = mentor_name;
        const id_data = String(result.length + 1);
        const createdAt = new Date();

        const {
            englishname,
            chinesename,
            japanesename,
            nickname,
            nation
        } = req.body;

        const mentorsData = {
            mentorsId: id_data,
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

router.get('', async function (req, res) {
    try {
        const mentor_name = await Mentor.find();
        const page = req.query.page;
        const size = req.query.size;
        const nationstatus = req.query.nationstatus;

        const pageData = mentor_name.slice(0, size * page);

        const result = {
            page: page,
            size: size,
            nationstatus: nationstatus
        };

        res.json(pageData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
    
});

router.get('/:mentorsId', function (req, res) {
    let mentorsId = req.params.mentorsId;
    const mentorFilter = mentorListData?.filter((item) => item.id === mentorsId);
    res.send(mentorFilter);
});

module.exports = router;