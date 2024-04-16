import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const api = axios.create({
 baseURL: config.authBaseURL,
 withCredentials:true
});


const adminApi = axios.create({
    baseURL: config.adminBaseURL,
});


export const studentApi = axios.create({
    baseURL: config.studentBaseURL,
    withCredentials:true
});


const instructorApi = axios.create({
    baseURL: config.instructorBaseURL,
});

const chatApi = axios.create({
    baseURL: config.chatBaseUrl,
});

chatApi.interceptors.request.use((config) => {
    const studentToken = localStorage.getItem('studentToken');
    if (studentToken !== null) {
    config.headers.authorization = `Bearer ${studentToken}`;
    }
    return config;
    })





studentApi.interceptors.request.use((config) => {
   const studentToken = localStorage.getItem('studentToken');
   if (studentToken !== null) {
   config.headers.authorization = `Bearer ${studentToken}`;
   }
   return config;
   })



studentApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              return Promise.reject(errorMessage);
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)




adminApi.interceptors.request.use((config) => {
   const adminToken = localStorage.getItem('studentToken');
   
   if (adminToken !== null) {
   config.headers.authorization = `Bearer ${adminToken}`;
   }
   return config;
   })



   adminApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)




instructorApi.interceptors.request.use((config) => {
   const instructorToken = localStorage.getItem('studentToken');
   if (instructorToken !== null) {
   config.headers.authorization = `Bearer ${instructorToken}`;
   }
   return config;
   })



   instructorApi.interceptors.response.use(     
      (response) => response,
      (error) => {
          if (error.response && error.response.data) {
              console.log(error.response, "error")
              const errorMessage = error.response.data.error || 'An error occurred';
              toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
          } else {
              console.error('Axios error:', error);
          }
          return Promise.reject(error);
      }
)


interface ApiRequestConfig extends AxiosRequestConfig {
 method: 'get' | 'post' | 'put' | 'patch' | 'delete';
 url: string;
 data?: any;
 params?: any;
}

const requestTimeout = 2000;

export const apiRequest = async (config: ApiRequestConfig) => {
 try {
    const response = await api(config);
    return response.data;
 } catch (error) {
    throw error;
 }
};


export const adminApiRequest = async (config: ApiRequestConfig) => {
    try {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => {
            abortController.abort();
          }, requestTimeout);
        config.signal = abortController.signal;
       const response = await adminApi(config);
       clearTimeout(timeoutId);
       return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.error('Request canceled:', error.message);
          } else {
            throw error;
          }
    }
};



export const studentApiRequest = async (config: ApiRequestConfig) => {
    try {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => {
            abortController.abort();
          }, requestTimeout);
        config.signal = abortController.signal;
       const response = await studentApi(config);
       clearTimeout(timeoutId);
       return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.error('Request canceled:', error.message);
          } else {
            throw error;
          };
    }
};





export const chatApiRequest = async (config: ApiRequestConfig) => {
    try {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => {
            abortController.abort();
          }, requestTimeout);
        config.signal = abortController.signal;
       const response = await chatApi(config);
       clearTimeout(timeoutId);
       return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.error('Request canceled:', error.message);
          } else {
            throw error;
          };
    }
};







export const instructorApiRequest = async (config: ApiRequestConfig) => {
    try {
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => {
            abortController.abort();
          }, requestTimeout);
        config.signal = abortController.signal;
       const response = await instructorApi(config);
       clearTimeout(timeoutId);
       return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.error('Request canceled:', error.message);
          } else {
            throw error;
          }
    }
};
