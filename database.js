const mysql = require('mysql2/promise');

// Create a connection to the database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jojoc3lyn.',
  database: 'pt_tunas_maju_group_db'
});

async function initialize() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to the MySQL database.');

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slide_number INT NOT NULL,
        image VARCHAR(255) NOT NULL,
        text VARCHAR(255) NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        catalog_id INT
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS catalog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        featured TINYINT(1) DEFAULT 0
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS company_profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        alt_text VARCHAR(255) NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS featured_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES catalog(id)
      );
    `);

    // Check if the 'featured' column exists in the 'catalog' table
    const [rows] = await connection.query(`
      SHOW COLUMNS FROM catalog LIKE 'featured';
    `);

    if (rows.length === 0) {
      // Add the 'featured' column if it does not exist
      await connection.query(`
        ALTER TABLE catalog ADD COLUMN featured TINYINT(1) DEFAULT 0;
      `);
      console.log("Added 'featured' column to 'catalog' table.");
    } else {
      console.log("'featured' column already exists in 'catalog' table.");
    }

    connection.release();
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}

initialize();

module.exports = db;
