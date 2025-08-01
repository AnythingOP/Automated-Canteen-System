const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/canteenDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth'); // New auth routes

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});