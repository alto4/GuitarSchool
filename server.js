const express = require('express');
const connectDatabase = require('./config/db');

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to Guitar School'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/lessons', require('./routes/api/lessons'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
