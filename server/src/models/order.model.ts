import mongoose, { Schema, Document } from 'mongoose';

export interface Order {
  instructorId : any;
  studentId : any;
  courseId : any;
  amount : number;
  createdAt:Date;
}

export interface OrderDocument extends Order, Document {}

const OrderSchema: Schema = new Schema({
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    amount : { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model<OrderDocument>('Order', OrderSchema);