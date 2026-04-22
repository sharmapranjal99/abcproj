const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    await user.save();
    res.send("Registered");
});

// Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.send("Wrong password");

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token });
});

module.exports = router;