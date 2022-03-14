import mysql from 'mysql2';
require('dotenv').config();

// 本番用の設定変数
const db = mysql.createConnection(process.env.DATABASE_URL || '');

// 開発環境用の設定変数
// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'my-refrigerator'
// });

export default db;
