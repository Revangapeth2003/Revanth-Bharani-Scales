// db/productModel.js
import pool from '../config/database.js';

// Get all products
export const getAllProducts = async (includeInactive = false) => {
  const query = includeInactive 
    ? 'SELECT * FROM products ORDER BY created_at DESC'
    : 'SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC';
  
  const result = await pool.query(query);
  return result.rows;
};

// Get product by ID
export const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Create new product
export const createProduct = async (productData) => {
  const { name, category, description, image, indiamart_url, whatsapp_message, rating } = productData;
  const result = await pool.query(
    `INSERT INTO products (name, category, description, image, indiamart_url, whatsapp_message, rating) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [name, category, description, image, indiamart_url, whatsapp_message, rating || 4.5]
  );
  return result.rows[0];
};

// Update product
export const updateProduct = async (id, productData) => {
  const { name, category, description, image, indiamart_url, whatsapp_message, rating, is_active } = productData;
  const result = await pool.query(
    `UPDATE products 
     SET name = $1, category = $2, description = $3, image = $4, 
         indiamart_url = $5, whatsapp_message = $6, rating = $7, 
         is_active = $8, updated_at = CURRENT_TIMESTAMP
     WHERE id = $9 
     RETURNING *`,
    [name, category, description, image, indiamart_url, whatsapp_message, rating, is_active, id]
  );
  return result.rows[0];
};

// Delete product
export const deleteProduct = async (id) => {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const result = await pool.query(
    'SELECT * FROM products WHERE category = $1 AND is_active = true ORDER BY rating DESC',
    [category]
  );
  return result.rows;
};

export default { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductsByCategory 
};
