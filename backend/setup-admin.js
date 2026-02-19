// backend/setup-admin.js
import bcrypt from 'bcryptjs';
import pool from './config/database.js';

const createAdminUser = async () => {
  try {
    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@bharaniscales.com';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('\n🔐 Creating admin user...');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Hashed Password:', hashedPassword);
    console.log('');

    // Delete existing admin if exists
    await pool.query('DELETE FROM admin_users WHERE username = $1', [username]);
    
    // Insert new admin
    const result = await pool.query(
      'INSERT INTO admin_users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );

    console.log('✅ Admin user created successfully!');
    console.log('User details:', {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email
    });
    console.log('\n📝 Use these credentials to login:');
    console.log('   Username: admin');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
