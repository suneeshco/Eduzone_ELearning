import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { studentApiRequest } from '../../../api/axios';
interface VideoPlayerProps {
    publicId: string;
    courseId: any;
    onClose: () => void;
  }

const VideoPlayer: React.FC<VideoPlayerProps> = ({ publicId , courseId , onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
  const [signedUrl, setSignedUrl] = useState('');
  const navigate = useNavigate()
  const location = useLocation();


  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const response = await studentApiRequest({
          method: 'get',
          url: '/video',
          params: {
            publicId: publicId,
            courseId: courseId,
          },
        });
        console.log("signedUrl",response.signedUrl);
        console.log("public",publicId);

        setSignedUrl(response.signedUrl);
      } catch (error: any) {
        console.error('Error fetching signed URL:', error);
      }
    };
    fetchSignedUrl();
  }, [publicId, courseId]);



// useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const response = await studentApiRequest({
//             method: 'get',
//             url: '/video',
//             params: {
//               publicId: publicId,
//               courseId: courseId,
//             },
//           });

//         // The server will stream the video directly to the client
//         console.log("response",response);

//         const videoStream = response.data;
//         if(videoRef.current){
//             videoRef.current.src = videoStream;
//         }

//       } catch (error: any) {
//         console.error('Error fetching video:', error);
//       }
//     };
//     fetchVideo();
//   }, [publicId, courseId]);
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="fixed z-50 top-0 left-0 flex w-full h-full justify-center items-center bg-black bg-opacity-65 flex-col">
    <div className="text-white flex w-full p-3 justify-end">
      <p onClick={handleCloseClick}>Close</p>
    </div>
    <div className=" h-5/6 w-9/12">
    {signedUrl && (
      <video controls className="w-full h-full object-contain bg-transparent" ref={videoRef}>
        <source src={signedUrl} />
      </video>
    )}
  </div>
  </div>
  );
};

export default VideoPlayer;





// import React, { useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for HTTP requests
// import { studentApi, studentApiRequest } from '../../../api/axios';

// interface VideoPlayerProps {
//     publicId: string;
//     courseId: any;
//     onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ publicId, courseId, onClose }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const fetchVideo = async () => {
//             try {
//                 // Fetch the video stream from the backend
//                 const response = await studentApiRequest({
//                     method: 'get',
//                     url: '/video',
//                     params: {
//                         publicId: publicId,
//                         courseId: courseId,
//                     },
//                 });

//                 // Create a URL for the video stream
//                 const videoUrl = URL.createObjectURL(new Blob([response.data]));

//                 // Set the video source to the URL of the video stream
//                 if (videoRef.current) {
//                     videoRef.current.src = videoUrl;
//                 }
//             } catch (error) {
//                 console.error('Error fetching video:', error);
//             }
//         };

//         fetchVideo();
//     }, [publicId, courseId]);

//     const handleCloseClick = () => {
//         onClose();
//     };

//     return (
//         <div className="fixed z-50 top-0 left-0 flex w-full h-full justify-center items-center bg-black bg-opacity-65 flex-col">
//             <div className="text-white flex w-full p-3 justify-end">
//                 <p onClick={handleCloseClick}>Close</p>
//             </div>
//             <div className=" h-5/6 w-9/12">
//                 <video controls className="w-full h-full object-contain bg-transparent" ref={videoRef}>
//                     {/* No need to specify source */}
//                 </video>
//             </div>
//         </div>
//     );
// };

// export default VideoPlayer;
