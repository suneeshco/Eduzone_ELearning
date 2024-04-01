import React, { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
interface CloudinaryWidgetConfig {
  cloudName: string;
  uploadPreset: string;
}

interface CloudinaryWidgetResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string
    // Add other properties if needed
  };
  // Add other properties if needed
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryWidgetConfig,
        callback: (error: any, result: CloudinaryWidgetResult) => void
      ) => any;
      // Define other properties/methods of cloudinary object if needed
    };
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: CloudinaryWidgetConfig;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({ uwConfig, setPublicId }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  useEffect(() => {
    // Initialize Cloudinary widget once loaded
    if (loaded) {
      initializeCloudinaryWidget();
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded && window.cloudinary && window.cloudinary.createUploadWidget) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: CloudinaryWidgetResult) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <span id="upload_widget" onClick={initializeCloudinaryWidget}
  className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
>
  <span
    className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
    >Video</span>
  <span
    className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
  >
    <svg
      className="svg w-8 text-white"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="5" y2="19"></line>
      <line x1="5" x2="19" y1="12" y2="12"></line>
    </svg>
  </span>
</span>



      
      
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
