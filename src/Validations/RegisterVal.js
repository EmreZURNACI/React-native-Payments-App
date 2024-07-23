import * as yup from 'yup'
export const registerValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email address is required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})