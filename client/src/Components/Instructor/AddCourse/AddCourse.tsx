// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import { addCourseValidationSchema } from '../../../Schemas/addCourseValidation';
// import { useNavigate } from 'react-router-dom';
// import { apiInstance } from '../../../api/config/axiosConfig';
// import axios from 'axios';

// const AddCourse = () => {

//   const navigate = useNavigate();

//   // const uploadFile = async ()=>{
//   //   const data = new FormData();
//   //   data.append('file', values.thumbnailImage);
//   //   data.append('upload_preset','images_preset')


//   //   try {
//   //     let cloudName = 'dwuy04s3s';
//   //     let resourceType = 'image';
//   //     let api = `https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload`;

//   //     const res = await axios.post(api,data);
//   //     const {secure_url} = res.data;
//   //     console.log(secure_url);
//   //     return secure_url
      
//   //   } catch (error) {
//   //     console.error(error);
      
//   //   }

//   // }



//   const handlePhotoUpload = async () => {
//     if (!values.thumbnailImage) {
//       console.log("No file selected for upload.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", values.thumbnailImage);
//       formData.append("upload_preset", "images_preset");
//       formData.append("cloud_name", "dwuy04s3s");
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dwuy04s3s/image/upload",
//         formData
//       );

//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading photo:", error.response.data);
//     }
//  };


//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//     initialValues: {
//       courseTitle: "",
//       courseCategory: "",
//       regularPrice: "",
//       offerPercentage: "",
//       features: "",
//       thumbnailImage: null
//     },
//     validationSchema: addCourseValidationSchema,
//     onSubmit: async (values) => {


//       const imgUrl = await handlePhotoUpload()
      
       
//     }
//    });




//   return (
//     <div className="w-full">
//       <h2 className="text-2xl font-bold mb-4 mx-auto max-w-xl">Add New Course</h2>
//       <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="px-6 py-4">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="courseTitle" className="block mb-2 font-bold">Course Title</label>
//               <input type="text" id="courseTitle" value={values.courseTitle}
//                   onChange={handleChange}
//                   onBlur={handleBlur} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.courseTitle && touched.courseTitle ? 'border-red-500' : ''}`} required />
//                   {errors.courseTitle && touched.courseTitle && <p className='text-red-500'>{errors.courseTitle}</p>}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="courseCategory" className="block mb-2 font-bold">Course Category</label>
//               <input type="text" id="courseCategory" value={values.courseCategory}
//                   onChange={handleChange}
//                   onBlur={handleBlur} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.courseCategory && touched.courseCategory ? 'border-red-500' : ''}`} required />
//                   {errors.courseCategory && touched.courseCategory && <p className='text-red-500'>{errors.courseCategory}</p>}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="regularPrice" className="block mb-2 font-bold">Regular Price</label>
//               <input type="number" id="regularPrice" value={values.regularPrice}
//                   onChange={handleChange}
//                   onBlur={handleBlur} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.regularPrice && touched.regularPrice ? 'border-red-500' : ''}`} required />
//                   {errors.regularPrice && touched.regularPrice && <p className='text-red-500'>{errors.regularPrice}</p>}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="offerPercentage" className="block mb-2 font-bold">Offer Percentage</label>
//               <input type="number" id="offerPercentage" value={values.offerPercentage}
//                   onChange={handleChange}
//                   onBlur={handleBlur} className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.offerPercentage && touched.offerPercentage ? 'border-red-500' : ''}`} required />
//                   {errors.offerPercentage && touched.offerPercentage && <p className='text-red-500'>{errors.offerPercentage}</p>}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="features" className="block mb-2 font-bold">Features</label>
//               <textarea id="features" value={values.features}
//                   onChange={handleChange}
//                   onBlur={handleBlur}className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.features && touched.features ? 'border-red-500' : ''}`} required />
//                   {errors.features && touched.features && <p className='text-red-500'>{errors.features}</p>}

//             </div>
//             <div className="mb-4">
//               <label htmlFor="thumbnailImage" className="block mb-2 font-bold">Thumbnail Image</label>
//               <input type="file" id="thumbnailImage" 
//                   onChange={handleChange}
//                   onBlur={handleBlur} accept='image/*' className="w-full border border-gray-300 rounded px-3 py-2" required />
//             </div>
//             <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Add Course</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { addCourse } from "../../../api/axiosPost";
import { getInstructorCategories } from "../../../api/axiosGet";
import { RootState } from "../../../Redux/RootState/RootState";
import { useSelector } from "react-redux";


function Addcourse() {

  interface Category {
    _id: string;
    categoryName: string;
    status: boolean;
  }

  const {instructorInfo} = useSelector((state:RootState)=>state.instructorAuth)

  const navigate = useNavigate();
const [categories,setCategories] = useState<Category[]>([])

  const [courseName, setCoursename] = useState<string>("");
  const [courseDuration, setCourseduration] = useState<string>("");
  const [courseFee, setCoursefee] = useState<number | string>(0);
  const [courseDescription, setCoursedescription] = useState<string>("");
  const [selectcategory, setSelectcategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudanaryURL, setCloudanaryURL] = useState("");



  useEffect( ()=>{
    const fetchCategories = async () => {
            try {
                const resp = await getInstructorCategories();
                
                console.log(resp.data);
                
                setCategories(resp.data); // Assuming resp is an array of Course objects
            } catch (error) {
                console.error("Failed to fetch lessons:", error);
                // Handle error appropriately
            }
        
    };
    fetchCategories();
   
  },[])

  


  const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
      try {
      const inputElement = e.target as HTMLInputElement; 
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        setImage(file);
      } else {
        // No file selected
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //As per the video//cloudinary Setup//For getting the cloudinary URL from the cloudinary.com

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

        //console.log("response",response)
        if (response.data && response.data.url) {
          console.log("Image uploaded successfully. URL:", response.data.url);
          setCloudanaryURL(response.data.url);
          console.log(response.data.url,"url")
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

    await submitImage()

    if (!cloudanaryURL) {
      toast.error("Error while Uploading Image");
      return;
    }
    if (!courseName.trim() || !courseDuration.trim() || !courseFee || !courseDescription.trim() || !selectcategory) {
      return toast.error("All fields are required");
      }
const datas = {
  courseName,courseDuration,courseFee,courseDescription,category :selectcategory,imageUrl:cloudanaryURL, instructorId : instructorInfo?._id
}

  let res = await addCourse(datas)
  if(res.data.course){
    toast.success("Course Added Successfully")
  }
    
  };

  return (
    <div className="flex items-center justify-center h-screen mt-10">
      <div className="mt-8  shadow-md p-8 w-full max-w-md rounded-lg border border-gray-400">
        <form onSubmit={handleSubmit} className="bg-white rounded p-4 sm:p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="text"
              value={courseName}
              onChange={(e) => {
                setCoursename(e.target.value);
              }}
              placeholder="Course Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Duration
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="text"
              value={courseDuration}
              onChange={(e) => {
                setCourseduration(e.target.value);
              }}
              placeholder="Duration"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Price
            </label>
            <input
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              type="number"
              value={courseFee}
              onChange={(e) => {
                setCoursefee(e.target.value);
              }}
              placeholder="Price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border rounded"
              placeholder="Description"
              value={courseDescription}
              onChange={(e) => {
                setCoursedescription(e.target.value);
              }}
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
              
              className="w-full py-2 px-4 text-white font-bold bg-blue-500 rounded-full focus:outline-none focus:shadow-outline hover:bg-blue-700"
              type="submit"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Addcourse;