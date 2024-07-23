import * as yup from 'yup'
export const newPaymentValidationSchema = yup.object().shape({
    content: yup
        .string()
        .required('Title is required'),
    price: yup
        .number()
        .required('Cost is required'),
})