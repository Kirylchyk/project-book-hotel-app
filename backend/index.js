require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/users');
const cards = require('./routers/cards');
const registration = require('./routers/registration');
const authorization = require('./routers/authorization');
const user = require('./routers/user');
const passwordRouter = require('./routers/passwordRouter');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api/cards', cards);

// My MongoDB connection string
const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

app.use('/api/users', router);

app.use('/api/users/registration', registration);

app.use('/api/authorization', authorization);

app.use('/api/users', user);

app.use('/api/users', passwordRouter);

//should be after setting up routes
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
