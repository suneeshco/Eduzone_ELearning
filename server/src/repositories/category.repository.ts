import Category , {CategoryDocument} from "../models/category.model";

export const createCategory = async (categoryData: Partial<CategoryDocument>): Promise<CategoryDocument > => {
    try {
      return await Category.create(categoryData);
    } catch (error) {
      throw error;
    }
  };

export const findCategoryByName = async (categoryName : string) : Promise<CategoryDocument | null> => {
  try {
    const category = await Category.findOne({categoryName:categoryName});
    return category || null;
  } catch (error) {
    throw error
  }
}

export const getCategories = async () =>{
  try {
    const categories = await Category.find({})
    return categories
  } catch (error) {
    throw error
  }
}

export const findCategoryById = async (id: string) => {
  try {
     const category = await Category.findOne({ _id: id });
     if (!category) {
       throw new Error('Category not found'); // Or handle it as you see fit
     }
     category.status = !category.status
     await category.save();
     return category;
  } catch (error) {
     throw error; // Or handle the error as needed
  }
 };

 export const getActiveCategories = async () =>{
  try {
    const categories = await Category.find({status:true})
    return categories
  } catch (error) {
    throw error
  }
}


export const findCategoryByIdAndUpdate = async (value:string,id: string) => {
  try {
     const category = await Category.findOne({ _id: id });
     if (!category) {
       throw new Error('Category not found'); // Or handle it as you see fit
     }
     category.categoryName = value
     await category.save();
     return category;
  } catch (error) {
     throw error; // Or handle the error as needed
  }
 };
 