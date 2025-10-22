const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Barcha o'qituvchilarni olish
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).populate('courses');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bitta o'qituvchini olish
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('courses');
    if (!teacher) {
      return res.status(404).json({ message: 'O\'qituvchi topilmadi' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yangi o'qituvchi qo'shish
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// O'qituvchini yangilash
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) {
      return res.status(404).json({ message: 'O\'qituvchi topilmadi' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// O'qituvchini o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'O\'qituvchi topilmadi' });
    }
    res.json({ message: 'O\'qituvchi muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
