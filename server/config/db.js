const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

 
const db = pool.promise();

async function connectDb() {
    try {
        await db.query('SELECT 1'); 
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

module.exports = { db, connectDb };
