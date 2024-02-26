import mongoose, { Schema, Document } from 'mongoose';

export interface Admin {
  email: string;
  password: string;
}

export interface AdminDocument extends Admin, Document {}

const AdminSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

});

export default mongoose.model<AdminDocument>('Admin', AdminSchema, 'admins');
