

import mongoose, { Schema, Document } from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  password: string;
}

export interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: {type: Number,required : true},
  password: { type: String, required: true },

});

export default mongoose.model<UserDocument>('User', UserSchema);
