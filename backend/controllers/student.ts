import { Request, Response } from 'express';
import Student, { IStudent } from '../model/studentModel';

// Register a new student
export const registerStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = new Student(req.body as IStudent);
    await student.save();
    res.status(201).json(student);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
