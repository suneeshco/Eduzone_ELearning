import React, { useState, useEffect } from 'react';
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { adminApiRequest, studentApiRequest } from '../../../api/axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import { Link } from 'react-router-dom';

import NoProducts from '../../CommonComponents/NoProducts';

const CourseList: React.FC = () => {


  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const location = useLocation()
  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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

  // if(searchParam) {
  //   setSearchQuery(searchParam)
  // }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = parseInt(e.target.value);
    console.log(selectedSort);

    setSort(selectedSort);
  };



  const handleCategoryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories(prevCategories => [...prevCategories, value]);
    } else {
      setSelectedCategories(prevCategories => prevCategories.filter(category => category !== value));
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


  const submitSearch = () => {
    navigate(`/courses?s=${searchQuery}`);
  };

  return (
    <>
      <div className=" pt-16 md:mx-1 my-4 md:my-2 border-b pb-2 md:pb-16 ">
        <div className="h-20 shadow-2xl flex justify-center items-center bg-slate-200">
          <h1 className="font-bold text-black text-4xl text-center">Courses</h1>
        </div>
        <div className="container bg-white px-12">
          <div className="h-20  flex justify-between items-center px-4 md:px-8">
            <div className="flex space-between">
              <div className="relative mr-4">
                <button
                  onClick={toggleFilter}
                  className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Categories
                </button>
                {showFilter && (
                  <ul
                    role="menu"
                    className="absolute z-10 w-40 md:w-auto max-h-[200px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-xs md:text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none right-0 mt-10"
                  >
                    {category.map((categ) => (
                      <li
                        key={categ._id}
                        role="menuitem"
                        className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                            value={categ._id}
                            onChange={handleCategoryChange}
                          />
                          <span className="ml-2 text-black font-bold">{categ.categoryName}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative">
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
          </div>


          <div className="flex flex-col md:flex-row px-8 bg-white">
            {currentItems.length < 1 ? (<NoProducts />) : (
              <div className="w-full md:w-full p-2 rounded-lg ">
                <div className="min-h-screen">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">What to learn next</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {currentItems.map((course) => (
                      <div key={course._id} className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                        <Link to={`/courseDetail/${course?._id}`}>
                          <img className="w-full h-40 object-cover-full" src={course?.imageUrl} alt="Course Thumbnail" />
                        </Link>
                        <div className="p-3">
                          <h4 className="text-base md:text-lg font-semibold text-gray-800">
                            {course.courseName}
                          </h4>
                          <p className="mt-1 text-sm md:text-base text-gray-600">
                            {course.courseDescription.length > 80 ? course.courseDescription.substring(0, 80) + "..." : course.courseDescription}
                          </p>
                          <div className="flex items-center mt-2 space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`w-3 h-3 md:w-4 md:h-4 ${index < course.rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'
                                  }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            ))}
                          </div>
                          <p className="mt-1 text-base font-semibold text-gray-700">
                            ₹{course.courseFee}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-3">
                    {pageNumbers.map((number) => (
                      <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 px-3 py-1 hover:bg-green-600 text-sm">
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

};

export default CourseList;
