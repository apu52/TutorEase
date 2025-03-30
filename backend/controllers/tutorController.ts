import teacherModel from "../model/teacherModel";
import { Request, Response } from "express";

interface Tutor {
    name: string;
    email: string;
    password: string;
    location: string;
    subject: string;
    rating?: number;
    preferredMode?: 'online' | 'offline';
    fees: number;
    description?: string;
    experience?: number;
}

export const getAllTutors = async (req: Request, res: Response): Promise<void> => {
    try {
        const tutors: Tutor[] = await teacherModel.find(req.query);
        res.status(200).json({ tutors });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tutors", error });
    }
};

export default {
    getAllTutors,
};