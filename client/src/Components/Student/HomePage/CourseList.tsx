import React, { useState, useEffect } from 'react';
import landImage from '../../../assets/images/HomePage/Course1.jpg'
import { Course } from '../../../utils/apiTypes/ApiTypes';
import { adminApiRequest, studentApiRequest } from '../../../api/axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../utils/apiTypes/ApiTypes';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { FaStar, FaRegStar } from 'react-icons/fa';
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
   <div className="mx-4 md:mx-1 my-4 md:my-4 border-b pb-2 md:pb-16">
   <div className="h-20 shadow-2xl flex justify-center items-center">
    <h1 className="font-bold text-black text-4xl text-center">Courses</h1>
  </div>
  <div className="container bg-gray-200">
    <div className="flex flex-col md:flex-row items-center p-5">
      <div className="flex items-center md:ml-auto mb-4 md:mb-0">
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

    <div className="flex flex-col md:flex-row mx-5">
      <div className="w-full md:w-1/6 md:ml-4 border-r border-gray-400 pr-10 mb-4 md:mb-0">
        <h1 className="text-black text-xl md:text-3xl font-bold ml-2 mb-4">Filters</h1>

        <button
          onClick={toggleFilter}
          className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Categories
        </button>
        {showFilter && (
          <ul
            role="menu"
            className="absolute z-10 w-40 md:w-auto min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-xs md:text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
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

      {currentItems.length<1 ? ( <NoProducts/>) : (
<div className="w-full md:w-5/6 bg-gradient-to-b from-blue-100 to-white p-4 rounded-lg">
<div className="min-h-screen">
  <h2 className="text-2xl md:text-3xl font-bold mb-4">What to learn next</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
    {currentItems.map((course) => (
      <div key={course._id} className="bg-white border border-gray-200 shadow-xl overflow-hidden">
        <Link to={`/courseDetail/${course?._id}`}>
          <img className="w-full h-48 object-cover" src={course?.imageUrl} alt="Course Thumbnail" />
        </Link>
        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-900">
            {course.courseName}
          </h4>
          <p className="mt-1 text-gray-800">
            {course.courseDescription}
          </p>
          <div className="flex mt-1 text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {index < 4 ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>
          <p className="mt-1 text-gray-800">
            ₹{course.courseFee}
          </p>
        </div>
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-4">
    {pageNumbers.map((number) => (
      <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-2 px-4 py-2 hover:bg-green-600">
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
