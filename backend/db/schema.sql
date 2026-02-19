-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(500),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create index on is_read for filtering
CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read);


-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500) NOT NULL,
    cloudinary_id VARCHAR(255),
    indiamart_url VARCHAR(500) NOT NULL,
    whatsapp_message TEXT NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating DESC);

-- Insert default admin user (username: admin, password: admin123)
-- Password is hashed using bcrypt
INSERT INTO admin_users (username, password, email) 
VALUES ('admin', '$2b$10$rKvVuJPZBXGxV8WqOK5Rl.oMhZ3w0vYZXd1pQY6jZ4YK5Ij5N0mC6', 'admin@bharaniscales.com')
ON CONFLICT (username) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category, description, image, indiamart_url, whatsapp_message, rating) VALUES
('Laboratory Precision Scale', 'laboratory', 'High-precision electronic weighing scale for laboratory and jewelry applications', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363032788/XO/SC/UB/200280552/eesaa-laboratry-machine-jewelry-machine-500x500.jpeg', 'https://www.indiamart.com/proddetail/laboratory-precision-scale-12345678.html', 'Hi, I''m interested in the Laboratory Precision Scale', 4.8),
('Digital Platform Weighing Scale', 'industrial', 'Heavy-duty industrial platform scale with LCD display and high accuracy', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363059824/JR/HO/FG/200280552/a9514a27-672e-427f-9cb5-a06a31e1ba2d-500x500.jpeg', 'https://www.indiamart.com/proddetail/digital-platform-weighing-scale-12345679.html', 'Hi, I''m interested in the Digital Platform Weighing Scale', 4.7),
('Portable Digital Scale', 'portable', 'Compact and portable weighing solution for retail and commercial use', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363026885/OH/NJ/OG/200280552/pen-500x500.jpeg', 'https://www.indiamart.com/proddetail/portable-digital-scale-12345680.html', 'Hi, I''m interested in the Portable Digital Scale', 4.5),
('Eesaa Portable Scale', 'portable', 'Professional portable weighing scale with digital display and tare function', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363026449/FL/YP/GR/200280552/eesaa-portable-scale-500x500.jpeg', 'https://www.indiamart.com/proddetail/eesaa-portable-scale-12345681.html', 'Hi, I''m interested in the Eesaa Portable Scale', 4.6),
('50kg Mini Portable Scale', 'portable', 'Eesaa mini portable scale with 50kg capacity, ideal for small businesses', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363025849/SZ/BL/UJ/200280552/50kg-eesaa-mini-portable-scale-500x500.jpeg', 'https://www.indiamart.com/proddetail/50kg-mini-portable-scale-12345682.html', 'Hi, I''m interested in the 50kg Mini Portable Scale', 4.4),
('Semi-Automatic Band Sealing Machine', 'accessories', 'Professional band sealing machine for packaging applications with temperature control', 'https://5.imimg.com/data5/SELLER/Default/2023/11/363066596/EE/WU/RS/200280552/semi-automatic-band-sealing-machine-500x500.jpeg', 'https://www.indiamart.com/proddetail/band-sealing-machine-12345683.html', 'Hi, I''m interested in the Semi-Automatic Band Sealing Machine', 4.3)
ON CONFLICT DO NOTHING;
