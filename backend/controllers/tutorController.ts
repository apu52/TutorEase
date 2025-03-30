import teacherModel from "../model/teacherModel";
import { Request, Response } from "express";

interface Tutor {
  name: string;
  email: string;
  password: string;
  location: string;
  subject: string;
  rating?: number;
  preferredMode?: "online" | "offline";
  fees: number;
  description?: string;
  experience?: number;
}

// @desc    Get all tutors with filters
// @route   GET /api/students/tutor
// @access  Public
export const getAllTutors = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      searchTerm,
      subject,
      locations,
      preferredMode,
      sort,
    } = req.query;

    // Build query object
    let query: any = {};

    // Search by name or subject
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { subject: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Filter by subject
    if (subject) {
      query.subject = { $in: (subject as string).split(",") };
    }

    // Filter by selected locations
    if (locations) {
      query.location = { $in: (locations as string).split(",") };
    }

    // Filter by preferred mode (online/offline)
    if (preferredMode) {
      query.preferredMode = preferredMode;
    }

    // Sort options
    let sortOptions: any = {};
    switch (sort) {
      case "rating":
        sortOptions.rating = -1;
        break;
      case "fees: low to high":
        sortOptions.fees = 1;
        break;
      case "fees: high to low":
        sortOptions.fees = -1;
        break;
      case "experience":
        sortOptions.experience = -1;
        break;
      default:
        sortOptions.rating = -1; // Default sort by rating
        break;
    }

    // Get filtered tutors
    const tutors: Tutor[] = await teacherModel.find(query).sort(sortOptions);
    res.status(200).json({ tutors });
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Error fetching tutors. Please try again later.", error });
  }
};

export default {
  getAllTutors,
};
