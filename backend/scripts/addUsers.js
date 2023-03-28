const mongoose = require('mongoose');
const User = require('../models/User');

// Run this code only once in terminal [node adUsers.js] to avoid duplicates in db
const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const seedUsers = async () => {
    const users = [
        { email: 'user1@example.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' },
        { email: 'user3@example.com', password: 'password3' },
    ];

    try {
        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }

    mongoose.connection.close();
};

seedUsers();
