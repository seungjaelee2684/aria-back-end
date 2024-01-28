const express = require('express');
const router = express.Router();
let db;
const cookieParser = require('cookie-parser');
const mentorListData = require('../lib/mentor');
const Mentor = require('../Schemas/MentorsSchema');

router.use(cookieParser());

router.post('/', async function (req, res) {

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

    result.push(mentorsData);

    // Mentor.insertOne(mentorsData);

    const mentor = { mentorList: result }
    res.json(mentor);
});

router.get('/', function (req, res) {
    // db.query('SELECT * from Users', (error, results, fields) => {
    //     if (error) throw error;
    //     console.log('User info is: ', results);
    //     res.send(results);
    // });
    // console.log(req.body);
    res.json(mentorListData);
});

router.get('/:mentorsId', function (req, res) {
    let mentorsId = req.params.mentorsId;
    const mentorFilter = mentorListData?.filter((item) => item.id === mentorsId);
    res.send(mentorFilter);
});

module.exports = router;