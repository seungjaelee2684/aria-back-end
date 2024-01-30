const dbConfig = require('../app/config/config');
const mysql = require('mysql2');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err.message);
  } else {
    console.log('MySQL 연결 성공!');
    // 이후 작업 수행
  }

  // connection.query('SELECT * from mentor_table', async (error, rows, fields) => {
  //   if (error) throw error;
  //   console.log('User info is: ', rows);
  // });

  connection.end((err) => {
    if (err) {
      console.error('MySQL 연결 종료 오류:', err.message);
    } else {
      console.log('MySQL 연결 종료 성공!');
    }
  });
});



module.exports = connection;