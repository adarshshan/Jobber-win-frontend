import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../Api/user';
import { useAppSelector } from '../../app/store';
import OAuth from '../../Components/User/userCommon/OAuth';
import { useFormik } from 'formik';
import { SignupValidation } from '../../Components/Common/Validations';

export interface FormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    password: string;
    confirmPassword?: string;
    role: string;
}
interface initialVal {
    name: string;
    email: string;
    phone: string;
    location: string;
    password: string;
    cpassword: string;
    role: string;
}
const initialValues: initialVal = {
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    cpassword: '',
    role: ''
}



const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const { userData } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (userData) navigate('/user/home');
    }, [userData]);

    const {  values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: SignupValidation,
        onSubmit: values => {
            const formData = { name: values.name, email: values.email, location: values.location, phone: values.phone, password: values.password, confirmPassword: values.cpassword, role: values.role }
            const hanSub = async () => {
                try {
                    let result = await signup(formData);
                    if (result) {
                        navigate('/user/otp-page');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            hanSub()
        },
    });
    
    return (
        <>
            <div className="bg-white min-h-screen flex">
                <div className="w-full flex flex-row">
                    <div className="hidden lg:flex flex-col justify-between bg-gradient-to-r from-blue-800 
                to-blue-950 bg-white 
                shadow-lg lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
                        <div className="flex items-center justify-start space-x-3">
                            <span className="bg-black rounded-full w-8 h-8"></span>
                            <Link to='/' className="font-medium text-xl">JobberWin</Link>
                        </div>

                        <div className="space-y-5">
                            <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug text-white font-extrabold">Enter your account and discover Your
                                Future</h1>
                            <p className="text-lg text-white">Already have an account?</p>
                            <Link to='/user/login'>
                                <button
                                    className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Login
                                    account here</button>
                            </Link>
                        </div>
                        <p className="font-medium">©</p>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
                        <div className="flex lg:hidden justify-between items-center w-full py-4">
                            <div className="flex items-center justify-start space-x-3">
                                <span className="bg-black rounded-full w-6 h-6"></span>
                                <a href="#" className="font-medium text-lg">Brand</a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>already have an account? </span>
                                <Link to='/user/login' className="underline font-medium text-[#070eff]">Login</Link>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
                            <div className="flex flex-col space-y-2 text-center pt-3">
                                <h2 className="text-3xl md:text-4xl font-bold">Create an account</h2>
                                <p className="text-md md:text-xl">Sign up or log in to go straight, no password required!</p>
                            </div>
                            <form onSubmit={handleSubmit} >
                                <div className="flex flex-col max-w-md space-y-5">
                                    <input
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.name && <small className='text-red-500'>{errors.name}</small>}
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.email && <small className='text-red-500'>{errors.email}</small>}
                                    <input
                                        type="text"
                                        name="phone"
                                        value={values.phone}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.phone && <small className='text-red-500'>{errors.phone}</small>}
                                    <input
                                        type="text"
                                        name="location"
                                        value={values.location}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Location"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.location && <small className='text-red-500'>{errors.location}</small>}
                                    <input
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.password && <small className='text-red-500'>{errors.password}</small>}
                                    <input
                                        type="password"
                                        name="cpassword"
                                        value={values.cpassword}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    {errors.cpassword && <small className='text-red-500'>{errors.cpassword}</small>}
                                    <select
                                        name="role"
                                        value={values.role}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium text-black" >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="recruiter">Recruiter</option>
                                    </select>
                                    {errors.role && <small className='text-red-500'>{errors.role}</small>}
                                    <button type='submit' className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit</button>


                                    <div className="flex justify-center items-center">
                                        <span className="w-full border border-black"></span>
                                        <span className="px-4">Or</span>
                                        <span className="w-full border border-black"></span>
                                    </div>
                                    <OAuth />
                                </div>
                            </form>
                        </div>

                        <div className="hidden lg:flex justify-between items-center w-full py-4">
                            <div className="flex items-center space-x-2">
                                <span>Already have an account? </span>
                                <Link to='/user/login' className="underline font-medium text-[#070eff]">Login now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
