import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  subject: string;
  rating?: number;
  preferredMode?: 'online' | 'offline';
}

const TeacherSchema: Schema<ITeacher> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  subject: { type: String, required: true },
  rating: { type: Number },
  preferredMode: { type: String, enum: ['online', 'offline'] }
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);
