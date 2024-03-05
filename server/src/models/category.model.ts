

import mongoose, { Schema, Document } from 'mongoose';

export interface Category {
  categoryName : string;
  status : boolean;
}

export interface CategoryDocument extends Category, Document {}

const CategorySchema: Schema = new Schema({
  categoryName: {type : String, required : true},
  status : {type : Boolean}

});

export default mongoose.model<CategoryDocument>('Category', CategorySchema,'Category');
