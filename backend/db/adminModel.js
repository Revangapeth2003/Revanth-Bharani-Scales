// db/adminModel.js
import pool from '../config/database.js';

// Get admin by username
export const getAdminByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1',
    [username]
  );
  return result.rows[0];
};

// Get admin by ID
export const getAdminById = async (id) => {
  const result = await pool.query(
    'SELECT id, username, email, created_at FROM admin_users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

export default { getAdminByUsername, getAdminById };
