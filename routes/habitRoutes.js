const express = require('express');
const { createHabit, getUserHabits, getHabitDetail } = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createHabit);
router.get('/', authMiddleware, getUserHabits);
router.get('/:id', authMiddleware, getHabitDetail);

module.exports = router;
