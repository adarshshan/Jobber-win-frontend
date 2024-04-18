import React, { FormEvent, useEffect, useState } from 'react';
import { GrFormLock } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../Api/user';
import { useAppSelector } from '../../app/store';
import { EMAIL_PATTERN, MOBILE_NUM_REGEX } from '../../constants/commonConstants';
import OAuth from '../../Components/User/userCommon/OAuth';

export interface FormData {
    name: string;
    email: string;
    phone: number;
    location: string;
    password: string;
    confirmPassword?: string;
    role: string;
}

const SignupPage: React.FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: 0,
        location: '',
        password: '',
        confirmPassword: '',
        role: '',
    });
    const navigate = useNavigate();

    const { userData } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (userData) navigate('/user/home');
    }, [userData]);

    const [err, setErr] = useState('');
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErr('');
        try {
            if (!EMAIL_PATTERN.test(formData.email.toString())) {
                setErr('Enter a valid Email.!');
                return;
            }
            if (!formData.name.trim().length || !formData.email.trim().length || !formData.location.length || !formData.password.length || !formData.confirmPassword.length || !formData.role.length) {
                setErr('input fields must not be blank!');
                return;
            }
            if (formData.password.trim() !== formData.confirmPassword.trim()) {
                setErr('Passwords are not matching!');
                return;
            }
            if (!MOBILE_NUM_REGEX.test(formData.phone.toString())) {
                setErr('Enter a valid phone number!');
                return;
            }
            let result = await signup(formData);
            if (result) {
                navigate('/user/otp-page');
            }
        } catch (error) {
            console.log(error as Error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

                    html, body {
                        font-family: 'Roboto', sans-serif;
                    }

                    .break-inside {
                        -moz-column-break-inside: avoid;
                        break-inside: avoid;
                    }
                    body {
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        min-height: 100vh;
                        line-height: 1.5;
                    }
                `}
            </style>
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
                            <p className="text-red-500">{err}</p>
                            <form onSubmit={handleSubmit} >
                                <div className="flex flex-col max-w-md space-y-5">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Location"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium text-black"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="recruiter">Recruiter</option>
                                    </select>
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
