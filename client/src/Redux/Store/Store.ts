import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/StudentAuth';



const store = configureStore({
    reducer: {
        studentAuth : authReducer,  
    }
})

export default store