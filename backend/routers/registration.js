const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model schema

router.post('/', async (req, res) => {
    // Handle the registration logic here
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            const newUser = new User({ email, password });
            await newUser.save();
            res.status(201).json({ message: 'User created', email, _id: newUser._id });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
