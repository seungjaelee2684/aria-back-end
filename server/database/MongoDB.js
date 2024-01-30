const mongoose = require('mongoose');
const connection = require('../connection.json');
const mentorNameModel = require('../Schemas/MentorsNameSchema');

const uri = connection.mongoURL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("MongoDB Connected...");
        // await addDocument();
    } catch (error) {
        console.error(error.message, error.stack);
        process.exit(1);
    }
};

// 새로운 문서를 추가하는 함수
const addDocument = async () => {
    try {
        // 새로운 문서 생성
        const newDocument = new mentorNameModel({
            mentorsId: "1",
            englishname: "Sanpati",
            chinesename: "圣帕蒂",
            japanesename: "さんぱち",
            nickname: "산파치",
            nation: "Japan",
            SNS: {
                home: null,
                youtube: null,
                twitter: "https://twitter.com/hatizyuusan",
                instagram: null,
                artstation: null,
                pixiv: null,
            },
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // MongoDB에 문서 저장
        await newDocument.save();

        console.log("Document added successfully");
    } catch (error) {
        console.error("Error adding document:", error);
    } finally {
        // 연결 종료
        mongoose.disconnect();
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