import React, { useState, useEffect } from 'react';
import landImage from '../../../assets/images/HomePage/LandingImage.png'
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { adminApiRequest, studentApiRequest } from '../../../api/axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../utils/apiTypes/ApiTypes';

const CourseList = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("")
  const [sort, setSort] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<Category[]>([])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courseDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }




  const QueryParams = new URLSearchParams(location.search)
  const searchParam = QueryParams.get('s')
  const sortParam = QueryParams.get('sort')
  console.log("search", searchParam);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = parseInt(e.target.value);
    console.log(selectedSort);

    setSort(selectedSort);
    navigate(`/courses?s=${searchParam}&sort=${selectedSort}`);
  };



  const handleCategoryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories(prevCategories => [...prevCategories, value]); // Use callback version of setState
    } else {
      setSelectedCategories(prevCategories => prevCategories.filter(category => category !== value)); // Use callback version of setState
    }
  };


  const fetchCourses = async () => {
    try {
      const response = await studentApiRequest({
        method: 'get',
        url: '/getAllCourses',
        params: {
          search: searchParam,
          sort: sort,
          categories: selectedCategories.join(',')
        }
      });
      setCourseDetails(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };



  useEffect(() => {
    fetchCourses()
  }, [searchParam, sort, selectedCategories])







  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiRequest({
          method: 'get',
          url: '/activeCategories',
        });

        setCategory(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container   ">
      <div className="flex items-right p-5">
        <div className="flex items-center ml-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mr-2">Sort By</label>
          <select
            id="sort"
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          >
            <option value='1'>Price low to high</option>
            <option value='-1'>Price high to low</option>
          </select>
        </div>
      </div>
      {/* Course Listings */}

      <div className='flex'>
        <div className=' w-1/6 ml-4'>
          <h1 className="text-black text-xl mt-4 ml-2">Filters</h1>
          <h2 className="text-black text-lg mt-4 ml-2">Categories</h2>
          <div className="ml-2 mt-2">
            {category.map((categ) => (
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    value={categ._id}
                    onChange={handleCategoryChange}
                  />
                  <span className="ml-2 text-black-500">{categ.categoryName}</span>
                </label>
              </div>
            ))}


          </div>
        </div>
        <div className=' w-5/6'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  gap-5 m-10">
            {/* Map through courses and render course cards */}
            {currentItems.map((course) => (
              <div key={course._id} className="border border-gray-200 overflow-hidden shadow-md">
                <img src={course.imageUrl} alt={course.courseName} className="w-full shadow-xl h-35 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{course.courseName}</h3>
                  <p className="text-gray-600">${course.courseFee}</p>
                  <p className="text-gray-600">Instructor: {course.instructorId?.firstname}</p>
                  <button className="mt-4 block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Section */}
          <div className="flex  mt-4 ml-10">
            {pageNumbers.map((number) => (
              <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );

};

export default CourseList;
