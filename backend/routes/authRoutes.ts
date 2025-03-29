import express from 'express';
import studentController from '../controllers/studentController';
const router = express.Router();

// @desc    Create a new student
// @route   POST /api/students
router.post('/', studentController.createStudent); 

// @desc    Get all students
// @route   GET /api/students
router.get('/', studentController.getAllStudents);

// @desc    Get a student by ID
// @route   GET /api/students/:id
router.get('/:id', studentController.getStudentById);

// @desc    Update a student by ID
// @route   PUT /api/students/:id
router.put('/:id', studentController.updateStudent);

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
router.delete('/:id', studentController.deleteStudent);

export default router;
