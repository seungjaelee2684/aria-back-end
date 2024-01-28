const mongoose = require('mongoose');
const connection = require('../connection.json');

const uri = connection.mongoURL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error.message, error.stack);
        process.exit(1);
    }
};

module.exports = connectDB;

// module.exports = () => {
//     const connect = () => {
//         if (process.env.NODE_ENV !== "production") {
//             mongoose.set("debug", true);
//         };
//         mongoose.connect(
//             "mongodb://localhost:27017/",
//             {
//                 dbName: "aria"
//             },
//             error => {
//                 if (error) {
//                     console.log("몽고디비 연결 에러", error);
//                 } else {
//                     console.log("몽고디비 연결 성공");
//                 }
//             }
//         )
//     };

//     connect();

//     mongoose.connection.on("error", error => {
//         console.log("몽고디비 연결 에러", error);
//     });

//     mongoose.connection.on("disconnected", () => {
//         console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
//         connect();
//     });

    
// };