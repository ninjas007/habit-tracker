const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
