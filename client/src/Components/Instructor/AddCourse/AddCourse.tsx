
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { addCourse } from "../../../api/axiosPost";
import { getInstructorCategories } from "../../../api/axiosGet";
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";
import { instructorApiRequest } from "../../../api/axios";


function Addcourse() {

  interface Category {
    _id: string;
    categoryName: string;
    status: boolean;
  }

  const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)

  const navigate = useNavigate();
  const [categories,setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(false);

  const [courseName, setCoursename] = useState<string>("");
  const [courseDuration, setCourseduration] = useState<string>("");
  const [courseFee, setCoursefee] = useState<string>('');
  const [courseDescription, setCoursedescription] = useState<string>("");
  const [selectcategory, setSelectcategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");




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
        setCloudanaryURL(response.data.url);
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

  if (!courseName.trim() || !courseDuration.trim() || !courseFee || !courseDescription.trim() || !selectcategory) {
    return toast.error("All fields are required");
    }
  if(parseInt(courseFee)<=0){
    return toast.error("All fields are required");
  }

  setLoading(true);

  let imUrl = await submitImage()

  if (!imUrl) {
    toast.error("Error while Uploading Image");
    return;
  }
  
const datas = {
courseName,courseDuration,courseFee,courseDescription,category :selectcategory,imageUrl:imUrl, instructorId : instructorInfo?._id
}


try {
  const response = await instructorApiRequest({
    method: 'post',
    url: '/instructor/addCourse',
    data: datas,
});


if(response){
  toast.success("Course Added Successfully")
  navigate("/instructor/myCourses")
}
} catch (error) {
  toast.error("Failed to add course");
}finally{
  setLoading(false);
}



  
};


  useEffect( ()=>{
    fetchCategories();
  },[])

  
  return (
    <div className="flex items-center justify-center w-full">
  <div className="w-full max-w-md">
    <div className="bg-white shadow-md rounded-lg p-8 border border-gray-400 items-center flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Course</h2>
      <form onSubmit={handleSubmit} className="w-full">

      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Course Name
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="text"
            value={courseName}
            onChange={(e) => setCoursename(e.target.value)}
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
            onChange={(e) => setCourseduration(e.target.value)}
            placeholder="Enter Duration"
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Course Price
          </label>
          <input
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            type="number"
            value={courseFee}
            onChange={(e) => setCoursefee(e.target.value)}
            placeholder="Enter Price"
          />
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
            placeholder="Enter Description"
            value={courseDescription}
            onChange={(e) => setCoursedescription(e.target.value)}
          />
        </div>

   
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Category
          </label>
          <select
            value={selectcategory}
            onChange={(e) => setSelectcategory(e.target.value)}
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

 
        <div className="flex items-center justify-center">
          <button
            className="w-full py-2 px-4 text-white font-semibold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
            type="submit"
          >
            {loading ? "Uploading" :"Create Course"  }
          </button>
        </div>

      </form>
    </div>
  </div>
</div>


  );
}
export default Addcourse;


