import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";
import { instructorApiRequest } from "../../../api/axios";
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

const EditCourse: React.FC = () => {
  interface Category {
    _id: string;
    categoryName: string;
    status: boolean;
  }

  const { courseId } = useParams();
  const { userInfo } = useSelector((state: RootState) => state.studentAuth);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [courseFee, setCourseFee] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      const response = await instructorApiRequest({
        method: 'get',
        url: '/categories',
      });
      console.log(response);
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const courseDetails = await instructorApiRequest({
        method: 'get',
        url: `/getSingleCourse/${courseId}`,
      });
      console.log("Course details:", courseDetails);
      setCourseName(courseDetails.courseName);
      setCourseDuration(courseDetails.courseDuration);
      setCourseFee(courseDetails.courseFee);
      setCourseDescription(courseDetails.courseDescription);
      setSelectedCategory(courseDetails.category);
      setCloudinaryURL(courseDetails.imageUrl);

    } catch (error) {
      console.error("Failed to fetch course details:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCourseDetails();
  }, []);

  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = e.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileExtension = file.name.split(".").pop();
        if (!fileExtension) {
          window.alert("Invalid file name. Please ensure the file has an extension.");
          return;
        }
        const allowedFileTypes = ["png", "jpg", "jpeg"];
        if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
          window.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
          return;
        }
        setImage(file);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const submitImage = async () => {
    try {
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "images_preset");
        data.append("cloud_name", "dwuy04s3s");

        console.log(image, "image")

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload",
          data
        );

        console.log("response", response)
        if (response.data && response.data.url) {
          console.log("Image uploaded successfully. URL:", response.data.url);
          setCloudinaryURL(response.data.url);
          console.log(response.data.url, "url")
          return response.data.url
        } else {
          console.error("Invalid response from Cloudinary", response.data);
          toast.error(
            "Error uploading image: Invalid response from Cloudinary"
          );
        }
      } else {
        toast.error("No image selected");
      }
    } catch (error) {
      console.error("Error while Uploading Image:", error);
      toast.error("Error uploading image: Please try again later");
    }
  };

  const handleSubmit = async () => {




    if (!courseName.trim()) {
      return toast.error("Course name is mandatory");
    }
    if (!courseFee) {
      return toast.error("Course fee is mandatory");
    }
    if (parseInt(courseFee) <= 0) {
      return toast.error("Enter a valid course fee");
    }
    if (!courseDescription.trim()) {
      return toast.error("Course description is mandatory");
    }
    if (!selectedCategory) {
      return toast.error("Select the category");
    }


    setLoading(true)
    let imUrl = image ? await submitImage() : cloudinaryURL

    if (!imUrl) {
      toast.error("Error while Uploading Image");
      return;
    }

    const datas = {
      courseName, courseFee, courseDescription, category: selectedCategory, imageUrl: imUrl, courseId
    }

    const res = await instructorApiRequest({
      method: 'put',
      url: '/editCourse',
      data: datas,
    });


    if (res) {
      setLoading(false)
      toast.success("Course Updated Successfully")
      navigate("/instructor/myCourses")
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        <Card className=" fixed top-20 h-auto md:h-screen md:max-h-[calc(100vh-2rem)] md:w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5" placeholder={undefined}>
          <List placeholder={undefined}>
            <Link to={'/instructor'}> <ListItem placeholder={undefined} className='text-black'>
              <ListItemPrefix placeholder={undefined}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            </Link>
            <Link to={'/instructor/myCourses'}><ListItem placeholder={undefined} className='text-black'>
              <ListItemPrefix placeholder={undefined}>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Courses
            </ListItem>
            </Link>
            <Link to={'/instructor/addCourse'}>
              <ListItem placeholder={undefined} className='text-black'>
                <ListItemPrefix placeholder={undefined}>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Add New Course

              </ListItem>
            </Link>
            <Link to={'/instructor/profile'}>
              <ListItem placeholder={undefined} className='text-black'>
                <ListItemPrefix placeholder={undefined}>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
          </List>
        </Card>

        <div className="ml-60 pl-5 mx-auto w-full px-4 py-8 ">

          <div className="flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 m-4 md:m-10 md:pe-10">
              <h1 className="font-bold text-4xl">Edit Course</h1><br /><br />
              <h1 className="font-bold text-xl">Customize Your Course</h1>
              <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
                <div className="p-3">
                  <label htmlFor="courseName" className="block text-md font-medium text-gray-700">
                    Course Name
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
                    placeholder="Enter Course Name"
                  />
                </div>
              </div>

              <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
                <div className="p-3">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
                    placeholder="Enter Description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
                <div className="p-3">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
                  >
                    <option>Select Category</option>
                    {categories?.map((category: any) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 m-4 md:m-10 pt-24 md:pe-10">

              <h1 className="font-bold text-xl">Sell Your Course</h1>

              <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
                <div className="p-3">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Course Price
                  </label>
                  <input
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
                    type="number"
                    value={courseFee}
                    onChange={(e) => setCourseFee(e.target.value)}
                    placeholder="Enter Price"
                  />
                </div>
              </div>

              <h1 className="font-bold text-xl">Thumbnail Image</h1>

              <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
                <div className="p-3">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Image
                  </label>
                  <input
                    className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleSubmitChange}
                  />
                  
                </div>
              </div>

              <div className="">
              {image ? (
                    <div className="">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Course"
                        className="mt-2 h-16 w-16 object-cover-full rounded w-full h-full"
                      />
                    </div>

                  ) : (
                    <div className="">
                      <img
                        src={cloudinaryURL}
                        alt="Course"
                        className="mt-2 h-16 w-16 object-cover-full rounded w-full h-full"
                      />
                    </div>

                  )}
              </div>

              

              <div className="mt-5">
                <button onClick={handleSubmit} className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  {loading ? "Editing Course..." : "Edit Course"}
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default EditCourse;
