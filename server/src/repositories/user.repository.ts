
import User, { UserDocument } from '../models/user.model';

export const createUser = async (userData: Partial<UserDocument>): Promise<UserDocument> => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string): Promise<UserDocument | null> => {
  try {
    return await User.findOne({ _id : id });
  } catch (error) {
    throw error;
  }
};
