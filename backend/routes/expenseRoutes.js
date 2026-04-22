const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

// Add Expense
router.post('/expense', auth, async (req, res) => {
    const exp = new Expense({
        userId: req.user.id,
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        date: new Date()
    });

    await exp.save();
    res.send("Expense Added");
});

// Get Expenses
router.get('/expenses', auth, async (req, res) => {
    const data = await Expense.find({ userId: req.user.id });
    res.json(data);
});

module.exports = router;