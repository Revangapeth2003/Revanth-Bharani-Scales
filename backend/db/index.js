import pool from '../config/database.js';

// Query helper function
export const query = (text, params) => {
  return pool.query(text, params);
};

// Get all contacts
export const getAllContacts = async () => {
  const result = await pool.query(
    'SELECT * FROM contacts ORDER BY created_at DESC'
  );
  return result.rows;
};

// Create new contact
export const createContact = async (contactData) => {
  const { name, email, phone, subject, message } = contactData;
  const result = await pool.query(
    `INSERT INTO contacts (name, email, phone, subject, message) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [name, email, phone, subject, message]
  );
  return result.rows[0];
};

// Get contact by ID
export const getContactById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM contacts WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// NEW: Delete contact by ID
export const deleteContactById = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

// NEW: Mark contact as read
export const markContactAsRead = async (id) => {
  try {
    const result = await pool.query(
      'UPDATE contacts SET is_read = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error marking contact as read:', error);
    throw error;
  }
};

export default { 
  query, 
  getAllContacts, 
  createContact, 
  getContactById, 
  deleteContactById, 
  markContactAsRead 
};
