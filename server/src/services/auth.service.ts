import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/user.repository';

export const signup = async (firstname: string,lastname:string, email: string, mobile:number, password: string): Promise<string> => {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({ firstname, lastname, email, mobile, password: hashedPassword });

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET!);
    return token;
  } catch (error) {
    throw error;
  }
};


export const login = async (email:string , password : string): Promise<string> =>{
    try {
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
          throw new Error('User not exists');
        }
    
        const passwordMatch = await bcrypt.compare( password, existingUser.password);

        if (!passwordMatch) {
        throw new Error('Incorrect password');
        }

        // If the password matches, generate and return a JWT token
        const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET!);
        return token;
      } catch (error) {
        throw error;
      }
}
