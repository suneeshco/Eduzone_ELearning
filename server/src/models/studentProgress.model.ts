import mongoose, { Schema, Document } from 'mongoose';

export interface StudentProgress {
    studentId: string;
    courseId: string;
    lessonId: string;
    isCompleted: boolean;
    createdAt: Date;
}

export interface StudentProgressDocument extends StudentProgress, Document { }

const StudentProgressSchema: Schema = new Schema({
    studentId: { type: String },
    courseId: { type: String },
    lessonId: { type: String },
    isCompleted: { type: Boolean },
    createdAt: { type: Date, default: Date.now }


});

export default mongoose.model<StudentProgressDocument>('StudentProgress', StudentProgressSchema);