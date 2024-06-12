const bcrypt = require('bcryptjs');
const pool = require('../database');

const User = {
  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return result.insertId;
  },
  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0];
  }
};

module.exports = User;
