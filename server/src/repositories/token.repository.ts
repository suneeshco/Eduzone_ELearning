import Token,{ TokenDocument } from "../models/token.model";

export const createToken = async (tokenData: Partial<TokenDocument>): Promise<TokenDocument> => {
    try {
      return await Token.create(tokenData);
    } catch (error) {
      throw error;
    }
  };

  export const findToken = async (userId: string, token :string): Promise<TokenDocument | null> => {
    try {
      return await Token.findOne({ userId: userId, token: token });
    } catch (error) {
      throw error;
    }
  };