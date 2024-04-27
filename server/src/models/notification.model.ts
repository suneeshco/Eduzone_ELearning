import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface Notification {
  receiverId : mongoose.Schema.Types.ObjectId;
  senderId : mongoose.Schema.Types.ObjectId;
  message : string;
  isRead : boolean;
  createdAt:Date;
  category : string;
}

export interface NotificationDocument extends Notification, Document {}

const NotificationSchema: Schema = new Schema({
  receiverId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message : { type : String},
  isRead : {type : Boolean, default: false},
  createdAt:{type:Date,default:Date.now},
  category : {type : String}

});

export default mongoose.model<NotificationDocument>('Notification', NotificationSchema);