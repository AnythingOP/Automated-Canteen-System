require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// --- CORS Configuration ---
// This tells your server to allow requests ONLY from your Vercel app
const corsOptions = {
  origin: 'https://automated-canteen-system.vercel.app',
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));


app.use(express.json());

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});