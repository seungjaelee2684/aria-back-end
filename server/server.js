const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const connectDB = require("./Schemas/db");
const cookieParser = require('cookie-parser');
const mentor = require('./routes/mentorRouter');
const notice = require('./routes/noticeRouter');
const operator = require('./routes/operatorRouter');

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: true, // 허용할 출처
    credentials: true,
    optionsSuccessStatus: 200, // CORS 요청 성공 상태 코드
};

app.use(cookieParser());

app.use(
    session({
        resave: false, // 세션이 변경되지 않은 경우에도 다시 저장할지
        saveUninitialized: true, // 초기화되지 않은 세션 저장할지
        secret: "Aria", // 세션 암호화 키
        cookie: {
            httpOnly: true, // JavaScript에서 쿠키 접근을 방지할지
            secure: true // 보안 연결(HTTPS)을 사용하지 않을 시 세션 쿠키 전송을 막을지
        }
    })
);

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mentors', mentor);
app.use('/api/notice', notice);
app.use('/api/certification', operator);

connectDB();

app.get("/", (req, res) => {
    res.json({ message: `Server is running on port ${PORT}` });
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
}); // 서버 열기