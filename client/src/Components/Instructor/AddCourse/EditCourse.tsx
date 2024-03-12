import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { editCourse } from "../../../api/axiosPut";
import { getInstructorCategories,getSingleCourse } from "../../../api/axiosGet";
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";

function EditCourse() {
  interface Category {
    _id: string;
    categoryName: string;
    status: boolean; 
  }

  const { courseId } = useParams();
  const { instructorInfo } = useSelector((state: RootState) => state.instructorAuth);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [courseFee, setCourseFee] = useState<string>("");
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");

  const fetchCategories = async () => {
    try {
      const resp = await getInstructorCategories();
      console.log(resp.data);
      setCategories(resp.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const courseDetails = await getSingleCourse(courseId);
      console.log("Course details:", courseDetails);
      setCourseName(courseDetails.data.courseName);
      setCourseDuration(courseDetails.data.courseDuration);
      setCourseFee(courseDetails.data.courseFee);
      setCourseDescription(courseDetails.data.courseDescription);
      setSelectedCategory(courseDetails.data.category);
      setCloudinaryURL(courseDetails.data.imageUrl);
      
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
        data.append("upload_preset","images_preset");
        data.append("cloud_name","dwuy04s3s");
  
        console.log(image,"image")
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload",
          data
        );
  
        console.log("response",response)
        if (response.data && response.data.url) {
          console.log("Image uploaded successfully. URL:", response.data.url);
          setCloudinaryURL(response.data.url);
          console.log(response.data.url,"url")
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseName.trim() || !courseDuration.trim() || !courseFee || !courseDescription.trim() || !selectedCategory) {
      return toast.error("All fields are required");
      }
    if(parseInt(courseFee)<=0){
      return toast.error("All fields are required");
    }
  
    let imUrl = image ? await submitImage() : cloudinaryURL
  
    if (!imUrl) {
      toast.error("Error while Uploading Image");
      return;
    }
    
  const datas = {
  courseName,courseDuration,courseFee,courseDescription,category :selectedCategory,imageUrl:imUrl, courseId
  }
  
  let res = await editCourse(datas)
  
  
  if(res){
    toast.success("Course Updated Successfully")
    navigate("/instructor/myCourses")
  }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8 border border-gray-400 items-center flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>
          <form onSubmit={handleSubmit} className="w-full">
            {/* Course Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Course Name</label>
              <input
                className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter Course Name"
              />
            </div>


            <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Course Duration
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            placeholder="Enter Duration"
          />
        </div>

        {/* Course Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Course Price
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="number"
            value={courseFee}
            onChange={(e) => setCourseFee(e.target.value)}
            placeholder="Enter Price"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            placeholder="Enter Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
          >
            <option>Select Category</option>
            {categories?.map((category: any) => (
              <option key={category?._id} value={category?._id}>
                {category?.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Image
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="file"
            onChange={handleSubmitChange}
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Course"
              className="mt-2 h-16 w-16 object-cover rounded"
            />
          )}
        </div>

        <label className="block text-gray-700 text-sm font-semibold mb-2">
            Current Image
          </label>
        <div className="mb-4">
              {cloudinaryURL && (
                <img
                  src={cloudinaryURL}
                  alt="Course"
                  className="mt-2 h-16 w-16 object-cover rounded"
                />
              )}
            </div>
            {/* Other form fields (Course Duration, Course Price, Description, Category, Image) */}
            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                className="w-full py-2 px-4 text-white font-semibold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
                type="submit"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
