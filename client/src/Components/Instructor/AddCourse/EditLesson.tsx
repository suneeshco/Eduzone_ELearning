import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getSingleCourse, getLessons } from '../../../api/axiosGet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { instructorApiRequest } from '../../../api/axios';

interface Course {
    _id: string;
    courseName: string;
    courseDuration: string;
    courseDescription: string;
    imageUrl: string;
    courseFee: number;
    createdAt: Date;
}

interface Lesson {
    _id: string;
    lessonTitle: string;
    lessonDescription: string;
    lessonVideo: string;
    createdAt: string;
    courseId: string;
}

const EditLesson = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const [courseDetails, setCourseDetails] = useState<Course | null>(null);
    const [lessonDetails, setLessonDetails] = useState<Lesson | null>(null)

    const [loading, setLoading] = useState(false);


    const navigate = useNavigate()
    const [title, setTitle] = useState<string | undefined>("")
    const [description, setDescription] = useState<string | undefined>("")
    const [video, setVideo] = useState<File | null>(null);
    const [cloudanaryURL, setCloudanaryURL] = useState<string | undefined>("");



    useEffect(() => {
        const fetchLessonDetails = async () => {
            try {
                const response = await instructorApiRequest({
                    method: 'get',
                    url: `/getLessonDetails/${lessonId}`,
                });

                console.log(response);

                setLessonDetails(response);
            } catch (error) {
                console.error("Failed to fetch lessons:", error);
            }

        };
        fetchLessonDetails();


    }, [])
    useEffect(() => {
        if (lessonDetails) {
            setTitle(lessonDetails.lessonTitle);
            setDescription(lessonDetails.lessonDescription);
            setCloudanaryURL(lessonDetails.lessonVideo);
        }
    }, [lessonDetails]);








    const handleSubmitChange = (e: React.FormEvent<HTMLInputElement>) => {
        try {
            const inputElement = e.target as HTMLInputElement;
            const files = inputElement.files;
            if (files && files.length > 0) {
                const file = files[0];
                console.log(file)
                setVideo(file)
            } else {
                setVideo(null)
            }
        }
        catch (error) {
            console.log(error)
        }
    }






    const submitVideo = async () => {
        try {
            if (video) {
                const data = new FormData();
                data.append("file", video);
                data.append("upload_preset", "videos_preset");
                data.append("cloud_name", "dwuy04s3s");
                console.log(video);
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dwuy04s3s/video/upload",
                    data
                )
                console.log(response, "Video Uploaded ");
                if (response.data && response.data.url) {
                    console.log("Video uploaded successfully. URL:", response.data.url);
                    setCloudanaryURL(response.data.url);
                    console.log(response.data.url, "url of video")
                    return response.data.url
                } else {
                    console.error("Invalid response from Cloudinary", response.data);
                    toast.error(
                        "Error uploading image: Invalid response from Cloudinary"
                    );
                }
            } else {
                toast.error("No video selected");
            }
        } catch (error) {
            console.error("Error while Uploading Video:", error);
            toast.error("Error uploading video: Please try again later");
        }
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!title || !description) {
            toast.error("Please fill in all fields.");
            return;
        }


        let url
        if (video) {
            setLoading(true);
            url = await submitVideo();
            console.log("my url", url);
        } else {
            url = cloudanaryURL
        }



        if (url) {
            const datas = {
                lessonTitle: title, lessonDescription: description, lessonVideo: url, courseId: lessonDetails?.courseId, lessonId: lessonId
            }




            try {
                const response = await instructorApiRequest({
                    method: 'put',
                    url: `/editLesson`,
                    data: datas,
                });
                console.log("response", response);

                if (response) {
                    toast.success("Lesson updated");
                    navigate(`/instructor/courseView/${lessonDetails?.courseId}`)
                } else {
                    toast.error("Failed to add lesson");
                }
            } catch (error) {
                console.error("Error adding lesson:", error);
                toast.error("Error adding lesson: Please try again later");
            } finally {
                setLoading(false);
            }




        }


    }



    const deleteLesson = async ()=>{
        try {
            const response = await instructorApiRequest({
                method: 'delete',
                url: `/deleteLesson/${lessonId}`
            });
            console.log("response", response);
            if(response){
                toast.success("lesson deleted")
                navigate(`/instructor/courseView/${lessonDetails?.courseId}`)
            }
        } catch (error) {
            
        }
    }



    return (
        <>

            <div className="mx-auto px-4 py-8">
                <div className="bg-blue-200 h-32 flex items-center justify-center">
                    <h1 className="text-3xl font-bold">Edit Lesson </h1>
                </div>


                <div className="p-4">
                    <div className='flex justify-end items-center'>
                        <div className='bg-slate-300 ' onClick={deleteLesson}>Delete Lesson</div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="bg-white shadow rounded-lg p-4">


                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Lesson Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Lesson Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                                    Lesson Video
                                </label>
                                <input
                                    type="file"
                                    name="video"
                                    id="video"
                                    accept="video/*"
                                    onChange={handleSubmitChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />

                                {video ? (
                                    <video
                                        controls
                                        src={URL.createObjectURL(video)}
                                        style={{ width: "100%" }}
                                    />
                                ) : cloudanaryURL && (
                                    <video
                                        controls
                                        src={cloudanaryURL}
                                        style={{ width: "100%" }}
                                    />
                                )}


                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                {loading ? "Adding Lesson..." : "Add Lesson"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditLesson;





