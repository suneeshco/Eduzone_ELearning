import Rating,{ RatingDocument } from "../models/ratings.model";


export const courseRating = async (data: Partial<RatingDocument>) => {
    try {
        let courseId = data.courseId
        let studentId = data.studentId
        let rating = data.rating
        let review = data.review

        if (!courseId || !studentId || rating === undefined || review === undefined) {
            throw new Error('Missing required data for course rating.');
        }
        
        let existingRating = await Rating.findOne({ courseId, studentId });
    
        
        if (existingRating) {
          existingRating.rating = rating; 
          existingRating.createdAt = new Date(); 
          existingRating.review = review;
          await existingRating.save(); 
          return existingRating;
        } else {
          const newRating = new Rating({
            courseId,
            studentId,
            rating: rating,
            review:review,
            createdAt: new Date()
          });
          await newRating.save(); 
          return newRating;
        }
      } catch (error) {
        throw error;
      }
  }



  export const getMyRating = async (courseId :string, studentId:string) => {
    try {
        
        let existingRating = await Rating.findOne({ courseId, studentId });
        if(existingRating){
          console.log(existingRating);
        }else{
          console.log("no existing rating");
          
        }
        
        
        return existingRating
      } catch (error) {
        throw error;
      }
  }



  export const getAllRating = async (courseId :string) => {
    try {
        
        let existingRating = await Rating.find({ courseId }).populate('studentId').sort({createdAt:-1});
        
        
        
        return existingRating
      } catch (error) {
        throw error;
      }
  }



  export const calculateOverallRating = async (courseId:string) => {
    try {
      const ratings = await Rating.find({ courseId: courseId });
      if (ratings.length === 0) {
        return 0;
      }
      const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const overallRating = totalRating / ratings.length;
      return overallRating;
    } catch (error) {
      console.error("Error calculating overall rating:", error);
      throw error;
    }
  };




  export const getAllRatingCount = async () => {
    try {
        
        let ratingCount = await Rating.countDocuments({});
        return ratingCount
      } catch (error) {
        throw error;
      }
  }