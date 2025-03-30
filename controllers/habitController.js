const pool = require('../db');

exports.createHabit = async (req, res) => {
    const { name, description, frequency, goal } = req.body;
    try {
        await pool.query('INSERT INTO Habits (user_id, name, description, frequency, goal) VALUES (?, ?, ?, ?, ?)', 
            [req.user.id, name, description, frequency, goal]);
        res.status(201).json({ message: "Habit created successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserHabits = async (req, res) => {
    try {
        const [habits] = await pool.query('SELECT * FROM Habits WHERE user_id = ?', [req.user.id]);
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHabitDetail = async (req, res) => {
    try {
        const [habit] = await pool.query('SELECT * FROM Habits WHERE id = ? AND user_id = ?', 
            [req.params.id, req.user.id]);
        if (habit.length === 0) return res.status(404).json({ message: "Habit not found!" });
        res.json(habit[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
