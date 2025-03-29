import express from 'express';
import studentController from '../controllers/studentController';
import teacherController from '../controllers/teacherController';

const router = express.Router();

/* 🚀 Student Routes */
router.post('/student', studentController.createStudent);
router.get('/student', studentController.getAllStudents);
router.get('/student/:id', studentController.getStudentById);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

/* 🚀 Teacher Routes */
router.post('/teacher', teacherController.registerTeacher);
router.get('/teacher', teacherController.getAllTeachers);
router.get('/teacher/:id', teacherController.getTeacherById);
router.put('/teacher/:id', teacherController.updateTeacher);
router.delete('/teacher/:id', teacherController.deleteTeacher); // ✅ Fixed Delete Route
router.get('/teacher/search', teacherController.getTeachersBySubjectAndLocation);

export default router;
