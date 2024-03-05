import * as Yup from 'yup';

export const addCourseValidationSchema = Yup.object().shape({
  courseTitle: Yup.string().required('Course Title is required'),
  courseCategory: Yup.string().required('Course Category is required'),
  regularPrice: Yup.number().typeError('Regular Price must be a number').required('Regular Price is required'),
  offerPercentage: Yup.number().typeError('Offer Percentage must be a number').required('Offer Percentage is required'),
  features: Yup.string().required('Features are required')
});
