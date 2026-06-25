const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth');

// ✅ ADD NEW JOB
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, company, location, status, notes } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      status,
      notes,
      userId: req.user.userId
    });

    await newJob.save();
    res.status(201).json({ message: 'Job added successfully', job: newJob });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ✅ GET ALL JOBS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId });
    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ✅ UPDATE JOB
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully', job });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// ✅ DELETE JOB
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;