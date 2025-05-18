/**
 * Table: comments
 *
 * Columns:
 * - id          INT AUTO_INCREMENT PRIMARY KEY
 * - post_id     INT NOT NULL            // FK → posts.id
 * - user_id     INT NOT NULL            // FK → users.id
 * - content     TEXT NOT NULL
 * - created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * - updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 */

const { db } = require('../config/db');

class Comment {
  static tableName = 'comments';

  static async create({ post_id, user_id, content }) {
    const [result] = await db.execute(
      `INSERT INTO ${Comment.tableName} 
       (post_id, user_id, content) 
       VALUES (?, ?, ?)`,
      [post_id, user_id, content]
    );
    return result.insertId;
  }

  static async getByPostId(post_id) {
    const [comments] = await db.execute(
      `SELECT c.*, u.username as author 
       FROM ${Comment.tableName} c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?`,
      [post_id]
    );
    return comments;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM ${Comment.tableName} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  static async delete(id) {
    await db.execute(
      `DELETE FROM ${Comment.tableName} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = Comment;