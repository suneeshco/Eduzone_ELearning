import { Request, Response } from 'express';
import { getAllCoursess, getEnrolledCoursess , getOverviews} from '../../services/course.service';
import { getCloudinaryUrl } from '../../repositories/instructor.repository';
import { updateProfiles, getStudentDetailss, studentChangeImages, courseRatings, updateOverallRating, getMyRatings, getAllRatings, getInstructors, getInstructorss ,updateProgressLesson, getProgresses } from '../../services/student.services';
import Stripe from "stripe";
import { createOrder } from '../../services/order.service';
import axios from 'axios'
import fs from 'fs'
import PDFDocument from 'pdfkit'

interface PaymentSession {
  instructorId: string;
  studentId: string;
  courseId: string;
  amount: number;
}

declare module "express-session" {
  interface Session {
    payment: PaymentSession | null;

  }
}




export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    let search = req.query.search
    let sort = req.query.sort
    let categories = req.query.categories
    const courses = await getAllCoursess(search, sort, categories);
    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding course" });
  }
}






export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, email, mobile, id } = req.body;
    const user = await updateProfiles(firstname, lastname, email, mobile, id);
    res.send({ user })
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: 'Server Error' });
  }
}






export const getStudentDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const details = await getStudentDetailss(id);
    res.send(details);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error getting details" });
  }
}






export const studentChangeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { photo, userId } = req.body;
    const user = await studentChangeImages(photo, userId);
    res.send({ user })
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: 'Server Error' });
  }
}






export const stripePayment = async (req: Request, res: Response) => {
  try {
    const { courseDetails, userId, userEmail } = req.body;
    const stripeSecretKey = process.env.STRIPE_KEY as string;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });
    console.log(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
            unit_amount: courseDetails?.courseFee * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      success_url: `${process.env.BASE_URL as string}/paymentSuccess`,
      cancel_url: `${process.env.BASE_URL as string}/usercourselist`,
    });

    console.log("Stripe Payment Session Created:", session);
    console.log("my url", session.url)
    req.session.payment = {
      instructorId: courseDetails.instructorId,
      studentId: userId,
      courseId: courseDetails._id,
      amount: courseDetails.courseFee
    };

    res.json({
      url: session.url,
    });
    console.log(session.payment_status, "status");


  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({
      error: "Payment error",
    });
  }
};











export const createOrders = async (req: Request, res: Response) => {
  try {
    console.log(req.session.payment)
    const paymentData = req.session.payment
    let instructorId = paymentData?.instructorId
    let studentId = paymentData?.studentId
    let courseId = paymentData?.courseId
    let amount = paymentData?.amount

    let data = {
      instructorId, studentId, courseId, amount
    }
    req.session.payment = null
    const payment = await createOrder(data)
    res.status(201).json({ payment })
  } catch (error) {
    console.log(error)
  }
}









export const getEnrolledCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    let studentId = req.params.id
    const courses = await getEnrolledCoursess(studentId);
    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding course" });
  }
}








export const courseRating = async (req: Request, res: Response): Promise<void> => {
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










export const getMyRating = async (req: Request, res: Response): Promise<void> => {
  try {
    let courseId = req.query.courseId
    let studentId = req.query.studentId
    courseId = courseId ?? '';
    studentId = studentId ?? '';
    const rated = await getMyRatings(courseId, studentId);
    res.send(rated);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error getting ratings" });
  }
}










export const getAllRating = async (req: Request, res: Response): Promise<void> => {
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








export const getInstructorList = async (req: Request, res: Response): Promise<void> => {
  try {
    const instructors = await getInstructors();
    res.send(instructors);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding course" });
  }
}




export const getInstructorListForStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    let search = req.query.search
    const instructors = await getInstructorss(search);
    res.send(instructors);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding course" });
  }
}






export const videoPlay = async (req: Request, res: Response): Promise<void> => {
  const publicId = req.query.publicId as string
  let cloudinaryUrl = await getCloudinaryUrl(publicId)
  try {
    const response = await axios({
      method: 'GET',
      url: cloudinaryUrl,
      responseType: 'stream',
    });

    res.setHeader('Content-Type', 'video/mp4');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}










export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, courseId, lessonId } = req.body;
    const user = await updateProgressLesson(studentId, courseId, lessonId);
    res.send({ user })
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: 'Server Error' });
  }
}









export const getProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    let courseId = req.query.courseId
    courseId = courseId ?? '';
    let studentId = req.query.studentId
    const progress = await getProgresses(courseId, studentId);
    console.log("progress", progress);

    res.send({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding lesson" });
  }
}



function generateCertificate(student: any, course: any, instructor: any) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 ,layout: 'landscape' });

  function jumpLine(doc:any, lines:any) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }
  

  const borderPadding = 10;
  const borderColor = '#000000'; 
  const borderLineWidth = 2;

  
  doc.lineWidth(borderLineWidth);
  doc.strokeColor(borderColor);
  doc.rect(borderPadding, borderPadding, doc.page.width - (2 * borderPadding), doc.page.height - (2 * borderPadding));
  doc.stroke();  
  
  // const backgroundPath = 'public/certificate.png';
  
  
  // doc.image(backgroundPath, 0, 0, {
  //   width: doc.page.width,  
  //   height: doc.page.height,  
  //   align: 'center',  
  //   valign: 'center',  
  // });
  
  doc.fontSize(10);
  
  
  const distanceMargin = 18;
  
  
  
  
  const maxWidth = 140;
  const maxHeight = 70;
  
  // doc.image('public/Eduzone_logo1.png', doc.page.width / 2 - maxWidth / 2, 60, {
  //   fit: [maxWidth, maxHeight],
  //   align: 'center',
  // });
  
  jumpLine(doc, 5)
  
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fill('#021c27')
    .text('Learn With Eduzone', {
      align: 'center',
    });
  
  jumpLine(doc, 4)
  
  
  doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .fill('#4b0082')
    .text('CERTIFICATE OF COMPLETION', {
      align: 'center',
    });
  
  jumpLine(doc, 1)
  
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fill('#021c27')
    .text('Present to', {
      align: 'center',
    });
  
  jumpLine(doc, 2)
  
  doc
    .font('Helvetica-Bold')
    .fontSize(28)
    .fill('#4b0082')
    .text(`${student}`, {
      align: 'center',
    });
  
  jumpLine(doc, 1)
  
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fill('#021c27')
    .text('Successfully completed the Course ', {
      align: 'center',
    });

    jumpLine(doc, 1);

    doc
    .font('Helvetica-Bold')
    .fontSize(20)
    .fill('#4b0082')
    .text(`${course}`, {
      align: 'center',
    });
  
  jumpLine(doc, 10)
  
  doc.lineWidth(1);
  
  const lineSize = 174;
  const signatureHeight = 390;
  
  doc.fillAndStroke('#021c27');
  doc.strokeOpacity(0.2);
  
  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
 
  
  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
 
  
  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
 
  
  doc
    .font('Helvetica-Bold')
    .fontSize(13)
    .fill('#021c27')
    .text('Instructor', startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: 'center',
    });
  
  jumpLine(doc, 4);
  
  doc.end();
  return doc;
}





export const generateCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { student, course , instructor} = req.body
   
    const doc = generateCertificate(student, course, instructor);
    const buffers: any = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);

  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');

      res.send(pdfData);
    })
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error generating certificate" });
  }
}







export const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const overView = await getOverviews();

    res.send({ overView });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding lesson" });
  }
}
