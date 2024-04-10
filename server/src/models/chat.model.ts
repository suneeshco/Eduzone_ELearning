import mongoose, { Schema, Document } from 'mongoose';

export interface Chat {
  members: string[];
  createdAt : Date; 
}

export interface ChatDocument extends Chat, Document {}

const ChatSchema: Schema = new Schema({
  members : {
    type : Array
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ChatDocument>('Chat', ChatSchema);