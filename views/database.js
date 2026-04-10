const Database = require('better-sqlite3');
const db = new Database('salon.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    username TEXT,
    password TEXT,
    email TEXT,
    role TEXT DEFAULT 'customer'
  )
`);

// Create appointments table
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service TEXT,
    date TEXT,
    status TEXT DEFAULT 'pending'
  )
`);

// Create services table
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT,
    duration TEXT
  )
`);

// Insert default admin user (plaintext password - intentionally vulnerable!)
const admin = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
if (!admin) {
  db.prepare('INSERT INTO users (fullname, username, password, email, role) VALUES (?, ?, ?, ?, ?)')
    .run('Admin User', 'admin', 'admin123', 'admin@glowsalon.com', 'admin');
}

// Insert sample services
const services = db.prepare('SELECT * FROM services').all();
if (services.length === 0) {
  db.prepare('INSERT INTO services (name, price, duration) VALUES (?, ?, ?)').run('Haircut', '€25', '30 mins');
  db.prepare('INSERT INTO services (name, price, duration) VALUES (?, ?, ?)').run('Manicure', '€20', '45 mins');
  db.prepare('INSERT INTO services (name, price, duration) VALUES (?, ?, ?)').run('Facial', '€40', '60 mins');
}

module.exports = db;