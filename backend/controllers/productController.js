// backend/controllers/productController.js
import pool from '../config/database.js';
import { cloudinary } from '../config/cloudinary.js';

// Get all products (public)
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Get all products including inactive (admin only)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('❌ Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('❌ Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Create product (admin only)
export const createProduct = async (req, res) => {
  let cloudinaryId = null; // Declare outside try block for error cleanup

  try {
    const { name, category, description, indiamart_url, whatsapp_message, rating } = req.body;

    // Get image from file upload or from body (URL)
    let imageUrl = req.body.image;
    cloudinaryId = req.body.cloudinary_id || null;

    // If file was uploaded via Cloudinary, use it
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
      cloudinaryId = req.file.filename; // Cloudinary public_id
    }

    // Check if all required fields are provided
    if (!name || !category || !description || !indiamart_url || !whatsapp_message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Image URL should come from Cloudinary upload or provided URL
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const result = await pool.query(
      `INSERT INTO products (name, category, description, image, cloudinary_id, indiamart_url, whatsapp_message, rating) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [name, category, description, imageUrl, cloudinaryId, indiamart_url, whatsapp_message, rating || 4.5]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Create product error:', error);

    // If there's a cloudinaryId, attempt to delete the uploaded image
    if (cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(cloudinaryId);
        console.log('Cleaned up Cloudinary image after error');
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary image:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, indiamart_url, whatsapp_message, rating, is_active } = req.body;

    // Get existing product
    const checkResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const existingProduct = checkResult.rows[0];
    let imageUrl = existingProduct.image;
    let newCloudinaryId = existingProduct.cloudinary_id;

    // Handle image update - check for file upload first, then body
    let newImage = req.body.image;
    let newCloudinaryIdFromBody = req.body.cloudinary_id || null;

    // If file was uploaded via Cloudinary, use it
    if (req.file) {
      newImage = req.file.path; // Cloudinary URL
      newCloudinaryIdFromBody = req.file.filename; // Cloudinary public_id
    }

    if (newImage && newImage !== existingProduct.image) {
      // New image was provided
      imageUrl = newImage;
      newCloudinaryId = newCloudinaryIdFromBody;

      // Delete old Cloudinary image if exists
      if (existingProduct.cloudinary_id) {
        try {
          await cloudinary.uploader.destroy(existingProduct.cloudinary_id);
          console.log('✅ Deleted old Cloudinary image:', existingProduct.cloudinary_id);
        } catch (deleteError) {
          console.error('⚠️ Failed to delete old Cloudinary image:', deleteError);
          // Continue anyway - don't fail the update
        }
      }
    }

    const result = await pool.query(
      `UPDATE products 
       SET name = $1, category = $2, description = $3, image = $4, 
           cloudinary_id = $5, indiamart_url = $6, whatsapp_message = $7, 
           rating = $8, is_active = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 
       RETURNING *`,
      [name, category, description, imageUrl, newCloudinaryId, indiamart_url, whatsapp_message, rating, is_active, id]
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Update product error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const checkResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = checkResult.rows[0];

    // Delete from Cloudinary if cloudinary_id exists
    if (product.cloudinary_id) {
      try {
        await cloudinary.uploader.destroy(product.cloudinary_id);
        console.log('✅ Deleted image from Cloudinary:', product.cloudinary_id);
      } catch (cloudinaryError) {
        console.error('⚠️ Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with database deletion even if Cloudinary fails
      }
    }

    // Delete product from database
    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

export default {
  getProducts,
  getAllProductsAdmin,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
