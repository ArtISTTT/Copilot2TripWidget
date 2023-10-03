import * as Yup from 'yup';

const nameRegex = /^[A-Za-z0-9]+$/;

export const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string()
        .min(8, 'Min 8 characters')
        .matches(nameRegex, 'Only letters and numbers')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain a uppercase letter')
        .required('required'),
});
