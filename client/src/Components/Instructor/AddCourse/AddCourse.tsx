
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";
import { instructorApiRequest } from "../../../api/axios";
import { studentLogout } from "../../../Redux/Slices/StudentAuth";
import { useDispatch } from "react-redux";


function Addcourse() {

  interface Category {
    _id: string;
    categoryName: string;
    status: boolean;
  }

  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([])

  const [loading, setLoading] = useState(false);

  const [courseName, setCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [courseFee, setCourseFee] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");




  const fetchCategories = async () => {
    try {
      const response = await instructorApiRequest({
        method: 'get',
        url: '/categories',
      });
      console.log("categ", response);
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
          setCloudanaryURL(response.data.url);
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
    if (!selectCategory) {
      return toast.error("Select the category");
    }

    if (!image) {
      return toast.error("Select the thumbnail image");
    }


    setLoading(true);

    let imUrl = await submitImage()

    if (!imUrl) {
      toast.error("Error while Uploading Image");
      return;
    }

    const datas = {
      courseName, courseFee, courseDescription, category: selectCategory, imageUrl: imUrl, instructorId: userInfo?._id
    }


    try {
      const response = await instructorApiRequest({
        method: 'post',
        url: '/addCourse',
        data: datas,
      });


      if (response) {
        toast.success("Course Added Successfully")
        navigate("/instructor/myCourses")
      }
    } catch (error: any) {
      if (error.response.data.error === 'Account is blocked') {

        dispatch(studentLogout({}))
        navigate('/student/login')


      }
      else {
        toast.error("Failed to add course");
      }


    } finally {
      setLoading(false);
    }




  };


  useEffect(() => {
    fetchCategories();
  }, [])


  return (
    //     <div className="flex items-center justify-center w-full">
    //   <div className="w-full max-w-md">
    //     <div className="bg-white shadow-md rounded-lg p-8 border border-gray-400 items-center flex flex-col">
    //       <h2 className="text-2xl font-bold mb-4 text-center">Add New Course</h2>
    //       <form onSubmit={handleSubmit} className="w-full">


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Course Name
    //           </label>
    //           <input
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //             type="text"
    //             value={courseName}
    //             onChange={(e) => setCoursename(e.target.value)}
    //             placeholder="Enter Course Name"
    //           />
    //         </div>


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Course Duration
    //           </label>
    //           <input
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //             type="text"
    //             value={courseDuration}
    //             onChange={(e) => setCourseduration(e.target.value)}
    //             placeholder="Enter Duration"
    //           />
    //         </div>


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Course Price
    //           </label>
    //           <input
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //             type="number"
    //             value={courseFee}
    //             onChange={(e) => setCoursefee(e.target.value)}
    //             placeholder="Enter Price"
    //           />
    //         </div>


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Description
    //           </label>
    //           <textarea
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //             placeholder="Enter Description"
    //             value={courseDescription}
    //             onChange={(e) => setCoursedescription(e.target.value)}
    //           />
    //         </div>


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Category
    //           </label>
    //           <select
    //             value={selectcategory}
    //             onChange={(e) => setSelectcategory(e.target.value)}
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //           >
    //             <option>Select Category</option>
    //             {categories?.map((category: any) => (
    //               <option key={category?._id} value={category?._id}>
    //                 {category?.categoryName}
    //               </option>
    //             ))}
    //           </select>
    //         </div>


    //         <div className="mb-4">
    //           <label className="block text-gray-700 text-sm font-semibold mb-2">
    //             Image
    //           </label>
    //           <input
    //             className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
    //             type="file"
    //             onChange={handleSubmitChange}
    //           />
    //           {image && (
    //             <img
    //               src={URL.createObjectURL(image)}
    //               alt="Course"
    //               className="mt-2 h-16 w-16 object-cover rounded"
    //             />
    //           )}
    //         </div>


    //         <div className="flex items-center justify-center">
    //           <button
    //             className="w-full py-2 px-4 text-white font-semibold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
    //             type="submit"
    //           >
    //             {loading ? "Uploading" :"Create Course"  }
    //           </button>
    //         </div>

    //       </form>
    //     </div>
    //   </div>
    // </div>



    // <div className="p-4 w-full">
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div className="bg-white shadow rounded-lg p-4">
    //       <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
    //       <div className="mb-4">
    //         <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
    //           Course Name
    //         </label>
    //         <input
    //           type="text"
    //           name="courseName"
    //           id="courseName"
    //           value={courseName}
    //           onChange={(e) => setCoursename(e.target.value)}
    //           className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
    //           placeholder="Enter Course Name"
    //         />
    //       </div>

    // <div className="mb-4">
    //   <label className="block text-gray-700 text-sm font-semibold mb-2">
    //     Course Price
    //   </label>
    //   <input
    //     className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
    //     type="number"
    //     value={courseFee}
    //     onChange={(e) => setCoursefee(e.target.value)}
    //     placeholder="Enter Price"
    //   />
    // </div>


    // <div className="mb-4">
    //   <label className="block text-gray-700 text-sm font-semibold mb-2">
    //     Description
    //   </label>
    //   <textarea
    //     className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
    //     placeholder="Enter Description"
    //     value={courseDescription}
    //     onChange={(e) => setCoursedescription(e.target.value)}
    //   />
    // </div>


    // <div className="mb-4">
    //   <label className="block text-gray-700 text-sm font-semibold mb-2">
    //     Category
    //   </label>
    //   <select
    //     value={selectcategory}
    //     onChange={(e) => setSelectcategory(e.target.value)}
    //     className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
    //   >
    //     <option>Select Category</option>
    //     {categories?.map((category: any) => (
    //       <option key={category?._id} value={category?._id}>
    //         {category?.categoryName}
    //       </option>
    //     ))}
    //   </select>
    // </div>


    // <div className="mb-4">
    //   <label className="block text-gray-700 text-sm font-semibold mb-2">
    //     Image
    //   </label>
    //   <input
    //     className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
    //     type="file"
    //     accept="image/png, image/jpeg"
    //     onChange={handleSubmitChange}
    //   />
    //   {image && (
    //     <img
    //       src={URL.createObjectURL(image)}
    //       alt="Course"
    //       className="mt-2 h-16 w-16 object-cover rounded"
    //     />
    //   )}
    // </div>
    //       <div className="flex items-center justify-center">
    //         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
    //           {loading ? "Adding Course..." : "Add Course"}
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>

    //main
    //   <div className="m-20 ml-20 me-40 pe-60 w-full mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-purple-600 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
    //   <h2 className="text-2xl font-bold text-white mb-6">Add New Course</h2>

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div className="mb-4 ">
    //       <label htmlFor="courseName" className="block text-sm font-medium text-gray-300">
    //         Course Name
    //       </label>
    //       <input
    //         type="text"
    //         name="courseName"
    //         id="courseName"
    //         value={courseName}
    //         onChange={(e) => setCourseName(e.target.value)}
    //         className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
    //         placeholder="Enter Course Name"
    //       />
    //     </div>

    //     <div className="mb-4">
    //       <label htmlFor="courseFee" className="block text-sm font-medium text-gray-300">
    //         Course Price
    //       </label>
    //       <input
    //         type="number"
    //         name="courseFee"
    //         id="courseFee"
    //         value={courseFee}
    //         onChange={(e) => setCourseFee(e.target.value)}
    //         className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
    //         placeholder="Enter Price"
    //       />
    //     </div>

    //     <div className="mb-4">
    //       <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-300">
    //         Description
    //       </label>
    //       <textarea
    //         name="courseDescription"
    //         id="courseDescription"
    //         value={courseDescription}
    //         onChange={(e) => setCourseDescription(e.target.value)}
    //         className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
    //         placeholder="Enter Description"
    //       ></textarea>
    //     </div>

    //     <div className="mb-4">
    //       <label htmlFor="selectCategory" className="block text-sm font-medium text-gray-300">
    //         Category
    //       </label>
    //       <select
    //         name="selectCategory"
    //         id="selectCategory"
    //         value={selectCategory}
    //         onChange={(e) => setSelectCategory(e.target.value)}
    //         className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
    //       >
    //         <option>Select Category</option>
    //         {categories?.map((category: any) => (
    //                <option key={category?._id} value={category?._id}>
    //                  {category?.categoryName}
    //                </option>
    //              ))}
    //       </select>
    //     </div>

    //     <div className="mb-4">
    //       <label htmlFor="image" className="block text-sm font-medium text-gray-300">
    //         Image
    //       </label>
    //       <input
    //         type="file"
    //         name="image"
    //         id="image"
    //         accept="image/png, image/jpeg"
    //         onChange={handleSubmitChange}
    //         className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
    //       />
    //       {image && (
    //         <img
    //           src={URL.createObjectURL(image)}
    //           alt="Course"
    //           className="mt-2 h-16 w-16 object-cover rounded"
    //         />
    //       )}
    //     </div>

    //     <div className="flex justify-end">
    //       <button
    //         type="submit"
    //         className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
    //       >
    //         {loading ? "Adding Course..." : "Add Course"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
<>

    <div className="flex w-full bg-white rounded border m-16">
      
      <div className="w-1/2 m-10 pe-10">

        <h1 className="font-bold text-xl">Customize Your Course</h1>
        <div className="mb-4 mt-5 bg-slate-300 rounded-lg">
          <div className="p-3 ">
            <label htmlFor="courseName" className="block text-md  font-medium text-gray-700">
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
          <div className="p-3 ">
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
          <div className="p-3 ">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Category
            </label>
            <select
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
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

      <div className="w-1/2 m-10 pe-10">
      <h1 className="font-bold text-xl">Sell Your Course</h1>


<div className="mb-4 mt-5 bg-slate-300 rounded-lg">
  <div className="p-3 ">
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
          <div className="p-3 ">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Image
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-600 rounded"
              type="file"
              accept="image/png, image/jpeg"
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

        </div>


        <div className="">
<button onClick={handleSubmit} className="px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              {loading ? "Adding Course..." : "Add Course"}
 </button>
</div>



        
      </div>
    </div>
    </>



  );
}
export default Addcourse;


