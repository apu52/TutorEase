import { Request, Response } from 'express';
import Teacher, { ITeacher } from '../model/teacher';

// Register a new teacher
export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacher = new Teacher(req.body as ITeacher);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get teachers by subject and location
export const getTeachersBySubjectAndLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, location } = req.query;
    const teachers = await Teacher.find({
      subjects: subject,
      location: location
    });
    res.json(teachers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
