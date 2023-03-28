const mongoose = require('mongoose');
const User = require('../models/User');


const mongoDBConnectionString = 'mongodb+srv://Kirylchyk:rita12@cluster0.j4dfwce.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const printUsers = async () => {
    try {
        const users = await User.find();
        console.log('All users in the database:');
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }

    mongoose.connection.close();
};

printUsers();
