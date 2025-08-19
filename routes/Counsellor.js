const express = require('express');
const router = express.Router();
const Counsellor = require('../models/Counsellor');

// GET /api/counsellor
router.get('/counsellor', async (req, res) => {
  try {
    const counsellors = await Counsellor.find();
    res.json(counsellors);
  } catch (err) {
    console.error('Error fetching counsellors:', err);
    res.status(500).json({ error: 'Failed to fetch counsellors' });
  }
});

module.exports = router;
