const dbConfig = require('../app/config/config');
const mysql = require('mysql2');

// const connection = {
//   init: function () {
//     return mysql.createConnection(dbConfig);
//   },
//   connect: function (conn) {
//     if (!conn) {
//       console.error('Connection이 유효하지 않습니다.');
//       return ;
//     }
//     conn.connect(function (error) {
//       if (error) {
//         console.error('MySQL 연결 에러 : ' + err);
//       } else {
//         console.log('MySQL 연결 성공!');
//       }
//     });
//   }
// };

// // connection 객체 초기화
// const conn = connection.init();

// // 초기화된 connection을 사용하여 연결
// connection.connect(conn);

// async function fetchData() {
//   const connection = await mysql.createConnection(dbConfig);

//   try {
//     const [rows, fields] = await connection.execute('SELECT * FROM mentor_table');
//     console.log('User info is: ', rows);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     // 연결 닫기
//     connection.end();
//   }
// }

// fetchData 함수 호출
// fetchData();


// connection.connect((err) => {
//   if (err) {
//     console.error('MySQL 연결 오류:', err.message);
//   } else {
//     console.log('MySQL 연결 성공!');
//     // 이후 작업 수행
//   }
// });

// const query = util.promisify(connection.query).bind(connection);

// try {
//   const rows = await query('SELECT * FROM mentor_table');
//   console.log('User info is: ', rows);
// } catch (error) {
//   console.error(error);
// } finally {
//   // 연결 닫기
//   connection.end();
// }

// connection.end((err) => {
//   if (err) {
//     console.error('MySQL 연결 종료 오류:', err.message);
//   } else {
//     console.log('MySQL 연결 종료 성공!');
//   }
// });



module.exports = fetchData;