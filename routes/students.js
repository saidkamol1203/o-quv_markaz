const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

// Barcha talabalarni olish
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('courses.course');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bitta talabani olish
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses.course');
    if (!student) {
      return res.status(404).json({ message: 'Talaba topilmadi' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yangi talaba ro'yxatdan o'tkazish
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Talabani kursga yozish
router.post('/:id/enroll', async (req, res) => {
  try {
    const { courseId } = req.body;
    const student = await Student.findById(req.params.id);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Talaba yoki kurs topilmadi' });
    }

    // Talaba allaqachon bu kursga yozilganmi tekshirish
    const existingEnrollment = student.courses.find(c => c.course.toString() === courseId);
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Talaba allaqachon bu kursga yozilgan' });
    }

    // Kursga joy bor-yo'qligini tekshirish
    if (course.currentStudents >= course.maxStudents) {
      return res.status(400).json({ message: 'Kursda joy qolmagan' });
    }

    student.courses.push({ course: courseId });
    course.currentStudents += 1;
    
    await student.save();
    await course.save();
    
    res.json({ message: 'Talaba muvaffaqiyatli kursga yozildi' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Talabani yangilash
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Talaba topilmadi' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Talabani o'chirish
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Talaba topilmadi' });
    }
    res.json({ message: 'Talaba muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
