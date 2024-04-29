"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverview = exports.generateCertificates = exports.getProgress = exports.updateProgress = exports.videoPlay = exports.getInstructorList = exports.getAllRating = exports.getMyRating = exports.courseRating = exports.getEnrolledCourses = exports.createOrders = exports.stripePayment = exports.studentChangeImage = exports.getStudentDetails = exports.updateProfile = exports.getAllCourses = void 0;
const course_service_1 = require("../../services/course.service");
const instructor_repository_1 = require("../../repositories/instructor.repository");
const student_services_1 = require("../../services/student.services");
const stripe_1 = __importDefault(require("stripe"));
const order_service_1 = require("../../services/order.service");
const axios_1 = __importDefault(require("axios"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let search = req.query.search;
        let sort = req.query.sort;
        let categories = req.query.categories;
        const courses = yield (0, course_service_1.getAllCoursess)(search, sort, categories);
        res.send(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getAllCourses = getAllCourses;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, mobile, id } = req.body;
        const user = yield (0, student_services_1.updateProfiles)(firstname, lastname, email, mobile, id);
        res.send({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ message: 'Server Error' });
    }
});
exports.updateProfile = updateProfile;
const getStudentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const details = yield (0, student_services_1.getStudentDetailss)(id);
        res.send(details);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error getting details" });
    }
});
exports.getStudentDetails = getStudentDetails;
const studentChangeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo, userId } = req.body;
        const user = yield (0, student_services_1.studentChangeImages)(photo, userId);
        res.send({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ message: 'Server Error' });
    }
});
exports.studentChangeImage = studentChangeImage;
const stripePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseDetails, userId, userEmail } = req.body;
        const stripeSecretKey = process.env.STRIPE_KEY;
        const stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: "2023-10-16",
        });
        console.log(stripeSecretKey);
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseName,
                            images: [courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.imageUrl],
                            description: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseDescription,
                            metadata: {
                                id: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails._id,
                            },
                        },
                        unit_amount: (courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.courseFee) * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: userEmail,
            success_url: `${process.env.BASE_URL}/paymentSuccess`,
            cancel_url: `${process.env.BASE_URL}/usercourselist`,
        });
        console.log("Stripe Payment Session Created:", session);
        console.log("my url", session.url);
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
    }
    catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).json({
            error: "Payment error",
        });
    }
});
exports.stripePayment = stripePayment;
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session.payment);
        const paymentData = req.session.payment;
        let instructorId = paymentData === null || paymentData === void 0 ? void 0 : paymentData.instructorId;
        let studentId = paymentData === null || paymentData === void 0 ? void 0 : paymentData.studentId;
        let courseId = paymentData === null || paymentData === void 0 ? void 0 : paymentData.courseId;
        let amount = paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount;
        let data = {
            instructorId, studentId, courseId, amount
        };
        req.session.payment = null;
        const payment = yield (0, order_service_1.createOrder)(data);
        res.status(201).json({ payment });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrders = createOrders;
const getEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.params.id;
        const courses = yield (0, course_service_1.getEnrolledCoursess)(studentId);
        res.send(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getEnrolledCourses = getEnrolledCourses;
const courseRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const rated = yield (0, student_services_1.courseRatings)(data);
        yield (0, student_services_1.updateOverallRating)(data.courseId);
        res.send(rated);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding lesson" });
    }
});
exports.courseRating = courseRating;
const getMyRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.query.courseId;
        let studentId = req.query.studentId;
        courseId = courseId !== null && courseId !== void 0 ? courseId : '';
        studentId = studentId !== null && studentId !== void 0 ? studentId : '';
        const rated = yield (0, student_services_1.getMyRatings)(courseId, studentId);
        res.send(rated);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error getting ratings" });
    }
});
exports.getMyRating = getMyRating;
const getAllRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.query.courseId;
        courseId = courseId !== null && courseId !== void 0 ? courseId : '';
        const rated = yield (0, student_services_1.getAllRatings)(courseId);
        res.send(rated);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding lesson" });
    }
});
exports.getAllRating = getAllRating;
const getInstructorList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructors = yield (0, student_services_1.getInstructors)();
        res.send(instructors);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding course" });
    }
});
exports.getInstructorList = getInstructorList;
const videoPlay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publicId = req.query.publicId;
    let cloudinaryUrl = yield (0, instructor_repository_1.getCloudinaryUrl)(publicId);
    try {
        const response = yield (0, axios_1.default)({
            method: 'GET',
            url: cloudinaryUrl,
            responseType: 'stream',
        });
        res.setHeader('Content-Type', 'video/mp4');
        response.data.pipe(res);
    }
    catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.videoPlay = videoPlay;
const updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId, lessonId } = req.body;
        const user = yield (0, student_services_1.updateProgressLesson)(studentId, courseId, lessonId);
        res.send({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send({ message: 'Server Error' });
    }
});
exports.updateProgress = updateProgress;
const getProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.query.courseId;
        courseId = courseId !== null && courseId !== void 0 ? courseId : '';
        let studentId = req.query.studentId;
        const progress = yield (0, student_services_1.getProgresses)(courseId, studentId);
        console.log("progress", progress);
        res.send({ progress });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding lesson" });
    }
});
exports.getProgress = getProgress;
function generateCertificate(student, course, instructor) {
    const doc = new pdfkit_1.default({ size: 'A4', margin: 50, layout: 'landscape' });
    function jumpLine(doc, lines) {
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
    jumpLine(doc, 5);
    doc
        .font('Helvetica-Bold')
        .fontSize(10)
        .fill('#021c27')
        .text('Learn With Eduzone', {
        align: 'center',
    });
    jumpLine(doc, 4);
    doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .fill('#4b0082')
        .text('CERTIFICATE OF COMPLETION', {
        align: 'center',
    });
    jumpLine(doc, 1);
    doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fill('#021c27')
        .text('Present to', {
        align: 'center',
    });
    jumpLine(doc, 2);
    doc
        .font('Helvetica-Bold')
        .fontSize(28)
        .fill('#4b0082')
        .text(`${student}`, {
        align: 'center',
    });
    jumpLine(doc, 1);
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
    jumpLine(doc, 10);
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
const generateCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student, course, instructor } = req.body;
        const doc = generateCertificate(student, course, instructor);
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');
            res.send(pdfData);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error generating certificate" });
    }
});
exports.generateCertificates = generateCertificates;
const getOverview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const overView = yield (0, course_service_1.getOverviews)();
        res.send({ overView });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error adding lesson" });
    }
});
exports.getOverview = getOverview;
