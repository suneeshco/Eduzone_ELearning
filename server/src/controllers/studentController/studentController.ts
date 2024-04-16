import { Request, Response } from 'express';
import { getAllCoursess , getEnrolledCoursess } from '../../services/course.service';
import { updateProfiles , getStudentDetailss , studentChangeImages , courseRatings , updateOverallRating , getMyRatings , getAllRatings ,getInstructors} from '../../services/student.services';
import Stripe from "stripe";
import { createOrder } from '../../services/order.service';

interface PaymentSession {
  instructorId : string;
  studentId:string;
  courseId:string;
  amount:number;
}

declare module "express-session" {
  interface Session {
    payment: PaymentSession | null;
    
  }
}


export const getAllCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        let search = req.query.search
        let sort =req.query.sort
        let categories = req.query.categories
        
        
        const courses = await getAllCoursess(search,sort,categories);
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}


export const updateProfile = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { firstname, lastname, email, mobile ,id } = req.body;
        const user = await updateProfiles(firstname, lastname, email, mobile, id);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}


export const getStudentDetails = async (req : Request,res : Response) : Promise<void> => {
    try {
        const id = req.params.id
        const details = await getStudentDetailss(id);
        res.send(details);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error getting details" });
    }
}


export const studentChangeImage = async (req : Request,res : Response) : Promise<void> => {
    try {
        const { photo , userId } = req.body;
        const user = await studentChangeImages(photo , userId);
        res.send({user})
      } catch (error) {
        console.log("error",error);
        res.status(500).send({ message: 'Server Error' });
      }
}



export const stripePayment = async (req: Request, res: Response) => {
    try {   

      
      
      const { courseDetails, userId , userEmail} = req.body;

  const stripeSecretKey = process.env.STRIPE_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});
  console.log(stripeSecretKey);
  
  
      const session = await stripe.checkout.sessions.create({
       payment_method_types:['card'],
        line_items: [
            {
              price_data: {
                currency: 'bdt',
                product_data: {
                    name: courseDetails?.courseName,
                    images: [courseDetails?.imageUrl],
                    description: courseDetails?.courseDescription,              
                    metadata: {
                      id: courseDetails?._id,
                    },
                },
                unit_amount:courseDetails?.courseFee * 100,
              },
              quantity: 1,
            },
          ],
        mode: "payment",
        customer_email:userEmail,
        success_url: `${process.env.BASE_URL as string}/paymentSuccess`,
        cancel_url: `${process.env.BASE_URL as string}/usercourselist`,
      });
  
      console.log("Stripe Payment Session Created:", session);
      console.log("my url",session.url)
      req.session.payment = {
        instructorId : courseDetails.instructorId,
        studentId:userId,
        courseId : courseDetails._id,
        amount:courseDetails.courseFee
      };
  
      res.json({
        url: session.url,
      });
      console.log(session.payment_status, "status");


      
  
      // if(session.payment_status === 'unpaid'){
      //   let instructorId = courseDetails.instructorId
      //   let studentId = userId
      //   let courseId = courseDetails._id
      //   let amount = courseDetails.courseFee

      //   let data={
      //       instructorId,studentId,courseId,amount
      //   }
        
      //   const result = await createOrder(data)
      // }
     
    } catch (error) {
      console.error("Stripe Payment Error:", error);
      res.status(500).json({
        error: "Payment error",
      });
    }
  };



  export const createOrders = async(req: Request, res: Response)=>{
    try {
      console.log(req.session.payment)
      const paymentData = req.session.payment
        let instructorId = paymentData?.instructorId
        let studentId = paymentData?.studentId
        let courseId = paymentData?.courseId
        let amount = paymentData?.amount

        let data={
            instructorId,studentId,courseId,amount
        }
        req.session.payment=null
      const payment=await createOrder(data)
      res.status(201).json({payment})
    } catch (error) {
      console.log(error)
    }
  }





// export const stripePayment = async (req: Request, res: Response) => {
//     try {
//         const { courseDetails, userId, userEmail } = req.body;

//         const stripeSecretKey = process.env.STRIPE_KEY as string;
//         const stripe = new Stripe(stripeSecretKey, {
//             apiVersion: "2023-10-16",
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'bdt',
//                         product_data: {
//                             name: courseDetails?.courseName,
//                             images: [courseDetails?.imageUrl],
//                             description: courseDetails?.courseDescription,
//                             metadata: {
//                                 id: courseDetails?._id,
//                             },
//                         },
//                         unit_amount: courseDetails?.courseFee * 100,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: "payment",
//             customer_email: userEmail,
//             success_url: `${process.env.BASE_URL as string}/paymentSuccess`,
//             cancel_url: `${process.env.BASE_URL as string}/usercourselist`,
//         });

//         console.log("Stripe Payment Session Created:", session);

//         res.json({
//             url: session.url,
//         });

//         console.log(session.payment_status, "status");

//     } catch (error) {
//         console.error("Stripe Payment Error:", error);
//         res.status(500).json({
//             error: "Payment error",
//         });
//     }
// };

// // Endpoint for handling Stripe webhook events
// // Endpoint for handling Stripe webhook events
// export const stripeWebhook = async (req: Request, res: Response) => {
//     try {
//         const stripeSecretKey = process.env.STRIPE_KEY as string;
//         const stripeSignature = req.headers['stripe-signature'] as string; // Type assertion

//         if (!stripeSignature) {
//             throw new Error('Stripe signature missing');
//         }

//         const stripe = new Stripe(stripeSecretKey, {
//             apiVersion: "2023-10-16",
//         });

//         // Verify the webhook signature
//         const event = stripe.webhooks.constructEvent(req.body, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET);

//         // Handle payment success event
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;

//             // Get relevant data from the session
//             const { courseDetails, userId } = session.metadata;

//             // Place the order
//             const result = await createOrder({
//                 instructorId: courseDetails.instructorId,
//                 studentId: userId,
//                 courseId: courseDetails._id,
//                 amount: courseDetails.courseFee
//             });

//             console.log("Order placed successfully:", result);
//         }

//         res.json({ received: true });
//     } catch (error) {
//         console.error("Stripe Webhook Error:", error);
//         res.status(500).json({
//             error: "Webhook error",
//         });
//     }
// };



export const getEnrolledCourses = async (req : Request,res : Response) : Promise<void> => {
    try {
        let studentId = req.params.id
        
        
        const courses = await getEnrolledCoursess(studentId);
        res.send(courses);
    } catch (error) {
        console.error(error); 
        res.status(500).send({ message: "Error adding course" });
    }
}



export const courseRating = async (req : Request,res : Response) : Promise<void> => {
  try {
    
      const data = req.body;
      
      const rated = await courseRatings(data);
      await updateOverallRating(data.courseId);
      res.send(rated);
  } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error adding lesson" });
  }
}


export const getMyRating = async (req : Request,res : Response) : Promise<void> => {
  try {
    let courseId = req.query.courseId 
    let studentId = req.query.studentId 
    

    courseId = courseId ?? '';
    studentId = studentId ?? '';

     
      
      
      const rated = await getMyRatings(courseId,studentId);
      res.send(rated);
  } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error getting ratings" });
  }
}


export const getAllRating = async (req : Request,res : Response) : Promise<void> => {
  try {
      let courseId = req.query.courseId 
      courseId = courseId ?? '';
      const rated = await getAllRatings(courseId);
      res.send(rated);
  } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error adding lesson" });
  }
}



export const getInstructorList = async (req : Request,res : Response) : Promise<void> => {
  try {
      
      const instructors = await getInstructors();
      res.send(instructors);
  } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error adding course" });
  }
}

// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: 'dwuy04s3s',
//   api_key: '856663183499572',
//   api_secret: '5zjwqxUUN6HNugD2jQjDFurytf0'
// });

// export const videoPlay = async (req: Request, res: Response): Promise<void> => {
//   const publicId = req.query.publicId;
//   const userId = req.query.userId
//   const expirationTimestamp = Math.round(Date.now() / 1000) + 60 * 60; 
//   const options = {
//       resource_type: 'video',
//       type: 'authenticated', 
//       expires_at: expirationTimestamp
//   };

//   const signedUrl = cloudinary.utils.private_download_url(publicId,userId, options);
//   res.json({ signedUrl });
// };



// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//  cloud_name: 'your_cloud_name',
//  api_key: 'your_api_key',
//  api_secret: 'your_api_secret'
// });

// export const videoPlay = async (req: Request, res: Response): Promise<void> => {

// // // Function to generate a signed URL for a video
// // const publicId = req.query.publicId;
// // function generateSignedUrl(publicId:any, options:any) {
// //  return cloudinary.url(publicId, {
// //     resource_type: 'video',
// //     sign_url: true,
// //     ...options
// //  });
// // }

// // // Example usage
// // const videoPublicId = publicId;
// // const signedUrl = generateSignedUrl(videoPublicId, {
// //  transformation: [
// //     { width: 640, height: 480, crop: 'fill' }
// //  ]
// // });

// // res.json( {publicId} );



// try {
//   const publicId = req.query.publicId;
  

//   // Stream the video content to the client
//   const videoStream = await cloudinary.v2.video(publicId).createReadStream();
//   videoStream.pipe(res);
// } catch (error) {
//   console.error('Error streaming video:', error);
//   res.status(500).json({ error: 'Internal server error' });
// }
// }




import cloudinary from 'cloudinary';
import request from 'request';

cloudinary.v2.config({
    cloud_name: 'dwuy04s3s',
    api_key: '856663183499572',
    api_secret: '5zjwqxUUN6HNugD2jQjDFurytf0'
});

export const videoPlay = async (req: Request, res: Response): Promise<void> => {
    try {
        const cloudinaryUrl = req.query.publicId as string; // Get the Cloudinary URL
        if (!cloudinaryUrl) {
            res.status(400).json({ error: 'Cloudinary URL is required' });
            return;
        }
        console.log(cloudinaryUrl);

        // Extract public ID from the Cloudinary URL
        const publicId = extractPublicId(cloudinaryUrl);
        if (!publicId) {
            res.status(400).json({ error: 'Invalid Cloudinary URL' });
            return;
        }

        // Fetch the video resource from Cloudinary
        const { resource_type, secure_url } = await cloudinary.v2.api.resource(publicId);

        // Check if the resource type is video
        if (resource_type !== 'video') {
            res.status(400).json({ error: 'Invalid resource type. Must be a video.' });
            return;
        }

        // Stream the video content directly to the response
        request(secure_url).pipe(res);
    } catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (cloudinaryUrl: string): string | null => {
    const parts = cloudinaryUrl.split('/');
    const publicIdIndex = parts.indexOf('upload') + 1;
    if (publicIdIndex > 0 && publicIdIndex < parts.length) {
        return parts[publicIdIndex];
    }
    return null;
}







