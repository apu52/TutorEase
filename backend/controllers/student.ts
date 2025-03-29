import { Request, Response } from 'express';
import Student, { IStudent } from '../model/student'

// Register a new student
export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = new Student(req.body as IStudent);
    await student.save();
    res.status(201).json(student);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
