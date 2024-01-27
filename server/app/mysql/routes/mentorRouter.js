const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const connection = require('../model/index');
const mentorListData = require('../../../lib/mentor');

router.use(cookieParser());

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