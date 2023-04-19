const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (user) {
            user.isAuthorized = true;
            await user.save();
            // Redirect the user to the frontend logged-in page
            res.redirect('http://localhost:3000/logged-in');
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;

