const express = require('express');
const cors = require('app')
const app = express();
const test = require('.//Router/test');

app.use(cors());
app.use('/', test);

const port=433; // HTTPS 통신은 433
app.listen(port, function () {
    console.log(`Listening on port ${port}`)
}); // 서버 열기