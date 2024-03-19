import Course, { CourseDocument } from '../models/course.model';

export const getAllCourse = async (search: any, sort: any, categories: any): Promise<CourseDocument[]> => {
  try {
    let query: any = {};
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query = { ...query, courseName: searchRegex };
    }

    let sortCriteria: any = {};
    if (sort === '1') {
      sortCriteria = { ...sortCriteria, courseFee: 1 };
    } else if (sort === '-1') {
      sortCriteria = { ...sortCriteria, courseFee: -1 };
    }

    if (categories && categories.length > 0) {
      let categ = categories.split(',')
      query = { ...query, category: { $in: categ } }; // Filter courses by categories
    }

    return await Course.find(query).populate('instructorId').sort(sortCriteria);
  } catch (error) {
    throw error;
  }
};
