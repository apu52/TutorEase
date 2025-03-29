import { NextFunction, Request, Response } from 'express';
import Teacher, { ITeacher } from '../model/teacherModel';

// @desc    Register a new teacher
// @route   POST /api/teachers
export const registerTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, location, subject, rating, preferredMode, fees, description, experience } = req.body;

    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      res.status(400).json({ message: 'Teacher already exists with this email' });
      return;
    }

    const teacher: ITeacher = new Teacher({
      name,
      email,
      password, // No password hashing
      location,
      subject,
      rating,
      preferredMode,
      fees,
      description,
      experience,
    });

    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error registering teacher', error });
  }
};

// @desc    Get all teachers
// @route   GET /api/teachers
export const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
};

// @desc    Get a single teacher by ID
// @route   GET /api/teachers/:id
export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher', error });
  }
};

// @desc    Update a teacher by ID
// @route   PUT /api/teachers/:id
export const updateTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, location, subject, rating, preferredMode, fees, description, experience } = req.body;

    const updateData: Partial<ITeacher> = {
      name,
      email,
      password, // No hashing
      location,
      subject,
      rating,
      preferredMode,
      fees,
      description,
      experience,
    };

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error });
  }
};

// @desc    Delete a teacher by ID
// @route   DELETE /api/teachers/:id
export const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error });
  }
};

// @desc    Get teachers by subject and location
// @route   GET /api/teachers/search
export const getTeachersBySubjectAndLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract query parameters safely
    const { subject, location }: { subject?: string; location?: string } = req.query;

    const query: Record<string, string | undefined> = {};
    if (subject) query.subject = subject;
    if (location) query.location = location;

    const teachers = await Teacher.find(query);+
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
};

export default {
  registerTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeachersBySubjectAndLocation,
};
