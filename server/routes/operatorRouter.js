const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const Mentor = require('../Schemas/MentorsNameSchema');

router.post('', async function (req, res) {
    try {
        const authenticationKey = "C51G2E3D7AB2E6O70WF9Q5"
        const { password } = req.body;
        if (password === authenticationKey) {
            res.json({ operator: true });
        } else {
            res.status(403).send("Enter the authentication key again");
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("No authentication");
    };
});

module.exports = router;