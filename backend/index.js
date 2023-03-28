const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/users');

const app = express();

app.use(express.json());
app.use(cors());

// Replace the connection string with your own MongoDB connection string
const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/users', router);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
