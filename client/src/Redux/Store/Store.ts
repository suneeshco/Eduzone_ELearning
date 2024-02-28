import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/StudentAuth';
import InstructorReducer from '../Slices/InstructorAuth';
import AdminReducer from '../Slices/AdminAuth';



const store = configureStore({
    reducer: {
        studentAuth : authReducer, 
        instructorAuth :  InstructorReducer,
        adminAuth : AdminReducer
    }
})

export default store