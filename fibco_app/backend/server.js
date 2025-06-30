// server.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'fibco_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create database connection pool
const pool = mysql.createPool(dbConfig);

// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Database initialization - Create users table if it doesn't exist
async function initDatabase() {
    try {
        const connection = await pool.getConnection();
        
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                surname VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        await connection.execute(createUsersTable);
        console.log('Database initialized successfully');
        connection.release();
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
}

// Initialize database on server start
initDatabase();

// Routes for serving HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/templates/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/templates/login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/templates/dashboard.html'));
});


// API Routes

// User Registration
app.post('/api/signup', async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        // Validation
        if (!name || !surname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        const connection = await pool.getConnection();

        // Check if user already exists
        const [existingUsers] = await connection.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            connection.release();
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await connection.execute(
            'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
            [name, surname, email, hashedPassword]
        );

        connection.release();

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: result.insertId, 
                email: email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: token,
            user: {
                id: result.insertId,
                name: name,
                surname: surname,
                email: email
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const connection = await pool.getConnection();

        // Find user by email
        const [users] = await connection.execute(
            'SELECT id, name, surname, email, password FROM users WHERE email = ?',
            [email]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token required'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
};

// Protected route example
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const connection = await pool.getConnection();
        
        const [users] = await connection.execute(
            'SELECT id, name, surname, email, created_at FROM users WHERE id = ?',
            [req.user.userId]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Logout route (client-side should remove token)
app.post('/api/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

app.use('/api/:path(*)', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    await pool.end();
    process.exit(0);
});