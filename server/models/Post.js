/**
 * Table: posts
 *
 * Columns:
 * - id          INT AUTO_INCREMENT PRIMARY KEY
 * - user_id     INT NOT NULL            // FK → users.id
 * - title       VARCHAR(255) NOT NULL
 * - content     TEXT NOT NULL
 * - created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * - updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 */

const { db } = require('../config/db');

class Post {
  static tableName = 'posts';

  static async create({ user_id, title, content }) {
    const [result] = await db.execute(
      `INSERT INTO ${Post.tableName} 
       (user_id, title, content) 
       VALUES (?, ?, ?)`,
      [user_id, title, content]
    );
    return result.insertId;
  }

  static async getAll() {
    const [posts] = await db.query(`
      SELECT p.*, u.username as author 
      FROM ${Post.tableName} p
      JOIN users u ON p.user_id = u.id
    `);
    return posts;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM ${Post.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async delete(id) {
    await db.execute(
      `DELETE FROM ${Post.tableName} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = Post;