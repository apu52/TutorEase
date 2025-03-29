import { NextFunction, Request, Response } from 'express';
import Student, { IStudent } from '../model/studentModel';

// @desc    Create a new student
// @route   POST /api/students
export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, location, interests, preferredLearningMode } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      res.status(400).json({ message: 'Student already exists with this email' });
    }

    const student: IStudent = new Student({
      name,
      email,
      password,
      location,
      interests,
      preferredLearningMode,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

// @desc    Get all students
// @route   GET /api/students
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// @desc    Update a student by ID
// @route   PUT /api/students/:id
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, location, interests, preferredLearningMode } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, password, location, interests, preferredLearningMode },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
