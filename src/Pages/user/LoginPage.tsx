import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css'
import { login } from '../../Api/user';
import { saveUser, setUserCredential } from '../../app/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import OAuth from '../../Components/User/userCommon/OAuth';
import { useFormik } from 'formik';
import { LoginValidation } from 'Components/Common/Validations';
import toast from 'react-hot-toast';

interface IinitialValues {
    email: string;
    password: string;
}
const initialValues: IinitialValues = {
    email: '',
    password: ''
}

const LoginPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { userData } = useAppSelector((state) => state.auth)

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginValidation,
        onSubmit: values => {
            const hanSub = async () => {
                try {
                    const result = await login(values.email, values.password);
                    if (result) {
                        dispatch(setUserCredential(result.data.data.token));
                        dispatch(saveUser(result.data.data.data));
                        navigate('/user/home');
                    }
                } catch (error) {
                    console.log(error as Error);
                    toast.error('somthing went wrong while login');
                }
            }
            hanSub();
        }
    })

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
                            <p className="text-lg text-white">You do not have an account?</p>
                            <Link to='/user/signup'>
                                <button
                                    className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Create
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
                                <span>Not a member? </span>
                                <Link to='/user/signup' className="underline font-medium text-[#070eff]">Sign up now</Link>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
                            <div className="flex flex-col space-y-2 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold">Sign in to account</h2>
                                <p className="text-md md:text-xl">Sign up or log in to go stright ,no password require!</p>
                            </div>
                            <div className="flex flex-col max-w-md space-y-5">
                                <form onSubmit={handleSubmit} className='  rounded-lg font-medium placeholder:font-normal'>
                                    <input type="email" placeholder="Email"
                                        name='email'
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-black rounded-lg mt-3" />
                                    {errors.email && <small className='text-red-500'>{errors.email}</small>}
                                    <input type="password" placeholder="Password"
                                        name='password'
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-black rounded-lg mt-3" />
                                    {errors.password && <small className='text-red-500'>{errors.password}</small>}
                                    <button type='submit' className="w-full rounded-lg mt-8 p-3 bg-black text-white">Submit</button>
                                </form>


                                <div className="flex justify-center items-center">
                                    <span className="w-full border border-black"></span>
                                    <span className="px-4">Or</span>
                                    <span className="w-full border border-black"></span>
                                </div>
                                <OAuth />
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-between items-center w-full py-4">
                            <div className="flex items-center space-x-2">
                                <span>Not a member? </span>
                                <Link to='/user/signup' className="underline font-medium text-[#070eff]">Sign up now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
