/**
 * Table: users
 *
 * Columns:
 * - id          INT AUTO_INCREMENT PRIMARY KEY
 * - username    VARCHAR(50) NOT NULL UNIQUE
 * - email       VARCHAR(100) NOT NULL UNIQUE
 * - password    VARCHAR(255) NOT NULL      // store hashed passwords only
 * - created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * - updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 */

const { db } = require('../config/db');

class User {
  static tableName = 'users';
 

  static async create({ username, email, password }) {
    const [result] = await db.execute(
      `INSERT INTO ${User.tableName} 
       (username, email, password) 
       VALUES (?, ?, ?)`,
      [username, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM ${User.tableName} WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

}

module.exports = User;