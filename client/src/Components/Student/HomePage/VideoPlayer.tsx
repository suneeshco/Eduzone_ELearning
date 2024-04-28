import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';


import { studentApiRequest } from '../../../api/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/RootState/RootState';
interface VideoPlayerProps {
  publicId: string;
  courseId: any;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ publicId, courseId, onClose }) => {
  const { userInfo } = useSelector((state: RootState) => state.studentAuth)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [signedUrl, setSignedUrl] = useState('');

  useEffect(() => {
    const fetche = async () => {
      const response = await studentApiRequest({
        method: 'get',
        url: `/video`,
        params: {
          publicId: publicId,
          courseId: courseId,
        },
        responseType: 'blob'
      });
      const videoUrl = URL.createObjectURL(response);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
      }
      console.log("videoUrl", videoUrl);

      setSignedUrl(videoUrl)
    }
    fetche()
  }, [])

  const handleVideoEnded = async () => {
    let datas = {
      studentId: userInfo?._id,
      courseId: courseId,
      lessonId: publicId
    };
    try {
      const response = await studentApiRequest({
        method: 'post',
        url: '/updateProgress',
        data: datas
      });
      console.log("Progress updated:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseClick = () => {
    onClose();
  };




  return (
    <div className="fixed z-50 top-0 left-0 flex w-full h-full justify-center items-center bg-black bg-opacity-65 flex-col">
      <div className="text-white flex w-full p-3 justify-end pe-10">
      <FaTimes onClick={handleCloseClick} className=' size-6 cursor-pointer'/>
      </div>
      <div className=" h-5/6 w-9/12">
        <video controls className="w-full h-full object-contain bg-transparent" ref={videoRef} onEnded={handleVideoEnded}>
        </video>

      </div>
    </div>
  );
};

export default VideoPlayer;


