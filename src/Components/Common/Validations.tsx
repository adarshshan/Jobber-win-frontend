import { MOBILE_NUM_REGEX } from 'constants/commonConstants';
import * as Yup from 'yup'

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

export const SignupValidation = Yup.object({
    name: Yup.string().min(3).required("Please Enter name"),
    email: Yup.string().email("Please Enter Valid Email").required("please Enter Email"),
    phone: Yup.string().matches(MOBILE_NUM_REGEX, "Enter a valid Phone number").min(10).max(10).required("Please Enter Phone number"),
    location: Yup.string().min(3).required("please Enter the location!"),
    password: Yup.string().matches(strongRegex, "Enter a Strong password").min(5).required("please Enter password!"),
    cpassword: Yup.string().oneOf([Yup.ref("password")], "Password not matching").required("please Enter the confirm password!"),
    role: Yup.string().required("please Select the role!"),
})

export const SubscriptionValidation = Yup.object({
    planName: Yup.string().min(3).required("please Enter the plan name"),
    duration: Yup.number().moreThan(-1).required('please Enter duration'),
    amount: Yup.number().moreThan(-1).required("please Enter the amount"),
    description: Yup.string().min(15).required('please fill the fields!')
})

export const LoginValidation = Yup.object({
    email: Yup.string().email("please Enter a valid Email Address!").required("please Enter Email!"),
    password: Yup.string().required("please Enter your password!")
})

export const JobPostValidation = Yup.object({
    title: Yup.string().min(3).required("please Fill the Title."),
    company_name: Yup.string().min(3).required("please enter the company name"),
    industry: Yup.string().required('please select somthing'),
    description: Yup.string().min(15).required("Please fill the description"),
    total_vaccancy: Yup.number().required("please fill the vaccancy").positive('invalid input!'),
    location: Yup.string().min(3).required("please fill the location"),
    job_type: Yup.string().required("please fill the field"),
    experience: Yup.number().moreThan(-1).required("please Fill the field!"),
    min_salary: Yup.number().positive("Please enter a valid salary.").required("Please fill the field."),
    max_salary: Yup.number().when('min_salary', (min_salary, schema: any) => {
        return schema.moreThan(min_salary, "Maximum salary must be less than minimum salary.");
    }).required("Please fill the field.")
})
export const newPasswordValidation = Yup.object({
    password: Yup.string().min(8).matches(strongRegex, "Enter a Strong password").required('Please Enter the password!'),
    cpassword: Yup.string().min(8).oneOf([Yup.ref("password")], "Password not matching").required('Please confirm the password!')
})