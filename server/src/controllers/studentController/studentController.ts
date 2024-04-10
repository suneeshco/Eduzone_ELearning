import { Request, Response } from 'express';
import { getAllCoursess , getEnrolledCoursess } from '../../services/course.service';
import { updateProfiles , getStudentDetailss , studentChangeImages , courseRatings , updateOverallRating , getMyRatings , getAllRatings} from '../../services/student.services';
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


