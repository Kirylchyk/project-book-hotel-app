const express = require('express');
const router = express.Router();
const User = require('../models/User');

module.exports = router;


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found in MongoDB' });
        }
        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
