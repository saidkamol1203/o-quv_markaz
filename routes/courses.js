const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Barcha kurslarni olish
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).populate('teacher');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bitta kursni olish
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher');
    if (!course) {
      return res.status(404).json({ message: 'Kurs topilmadi' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yangi kurs yaratish
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kursni yangilash
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Kurs topilmadi' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kursni o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Kurs topilmadi' });
    }
    res.json({ message: 'Kurs muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
