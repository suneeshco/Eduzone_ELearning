import mongoose, { Schema, Document } from 'mongoose';

export interface Message {
  chatId: string;
  senderId: string;
  text : string;
  createdAt : Date; 
  isRead : boolean;
}

export interface MessageDocument extends Message, Document {}

const MessageSchema: Schema = new Schema({
  chatId : { type : String},
  senderId : { type : String},
  text : { type : String},
  createdAt: { type: Date, default: Date.now },
  isRead : {type : Boolean, default : false}
});

export default mongoose.model<MessageDocument>('Message', MessageSchema);