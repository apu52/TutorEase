import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  interests: string;
  preferredLearningMode?: 'online' | 'offline';
  priceRange?: {
    min: number;
    max: number;
  };
}

const StudentSchema: Schema<IStudent> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  interests: { type: String, required: true },
  preferredLearningMode: { type: String, enum: ['online', 'offline'] },
  priceRange: {
    min: { type: Number },
    max: { type: Number }
  }
});

export default mongoose.model<IStudent>('Student', StudentSchema);
