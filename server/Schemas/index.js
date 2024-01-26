const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
        mongoose.connect(
            "mongodb://localhost:27017/til",
            {
                debug: "til"
            },
            error => {
                if (error) {
                    console.log("몽고디비 연결 에러", error);
                } else {
                    console.log("몽고디비 연결 성공");
                }
            }
        );
    }
};