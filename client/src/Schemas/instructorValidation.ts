import * as yup from 'yup';

export const instructorLoginSchema = yup.object().shape({
    email : yup.string().email("Please enter a valid email").required("Required")    
})

export const instructorSignUpSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    mobile: yup.string()
    .matches(/^[1-9][0-9]{9}$/, 'Mobile number must be 10 digits and should not start with 0')
    .required('Mobile number is required'),
    password: yup.string()
       .required('Password is required')
       .min(8, 'Password must have at least 8 characters')
       .matches(/[0-9]/, 'Password must contain at least one number')
       .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
       .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: yup.string()
       .required('Confirm password is required')
       .oneOf([yup.ref('password')], 'Passwords must match'),
});