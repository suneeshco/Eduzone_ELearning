import mongoose, { Schema, Document } from 'mongoose';

export interface Token {
    userId : string;
    token : string;
    createdAt:Date;
}

export interface TokenDocument extends Token, Document {}

const TokenSchema: Schema = new Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    createdAt:{type:Date,default:Date.now,expires :3600}
});

export default mongoose.model<TokenDocument>('Token', TokenSchema);