const express = require('express');
const cors = require('cors');
const app = express();
const main = require('./Router/mainRouter');
const mentor = require('./Router/mentorRouter');
const notice = require('./Router/noticeRouter');

const corsOptions = {
    origin: 'http://localhost:3000', // 허용할 출처
    optionsSuccessStatus: 200, // CORS 요청 성공 상태 코드
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', main);
app.use('/api/mentors', mentor);
app.use('/api/notice', notice);

const port=433; // HTTPS 통신은 433
app.listen(port, function () {
    console.log(`Listening on port ${port}`)
}); // 서버 열기