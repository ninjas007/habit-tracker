const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO Users (name, email, password_hash) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (user.length === 0) return res.status(400).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: "12h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
