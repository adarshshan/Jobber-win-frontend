import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css'
import { login } from '../../Api/user';
import { setUserCredential } from '../../app/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { userData } = useAppSelector((state) => state.auth)

    const loginHandler = async () => {
        try {
            const result = await login(email, password);
            if (result) {
                dispatch(setUserCredential(result));
                navigate('/user/home');
            }
        } catch (error) {
            console.log(error as Error);
            setErr(error as string);
        }
    }

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
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
                                <button onClick={loginHandler} className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Submit</button>

                                <div className="flex justify-center items-center">
                                    <span className="w-full border border-black"></span>
                                    <span className="px-4">Or</span>
                                    <span className="w-full border border-black"></span>
                                </div>
                                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                                    <span className="absolute left-4">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.03636364 15.1090909,0 12,0 C6.36363636,0 1.54545455,4.24545455 0.363636364,9.52727273 L5.26620003,9.76452941 Z"></path>
                                            <path fill="#4285F4" d="M12,24 C15.1090909,24 17.7818182,22.9636364 19.9090909,20.9909091 L16.4181818,17.5 C15.2181818,18.4818182 13.6909091,19.0909091 12,19.0909091 C8.85444915,19.0909091 6.19878754,17.0613679 5.26620003,14.2354706 L0.363636364,14.4727273 C1.54545455,19.7545455 6.36363636,24 12,24 Z"></path>
                                            <path fill="#FBBC05" d="M0.363636364,14.4727273 L5.26620003,19.7645294 C8.40242632,15.7385276 14.0187024,13.3090909 19.9090909,13.3090909 L19.9090909,6.49090909 L12,6.49090909 C6.36363636,6.49090909 1.54545455,10.7363636 0.363636364,14.4727273 Z"></path>
                                            <path fill="#34A853" d="M12,19.0909091 C8.92497411,19.0909091 6.47419893,17.6486409 5.26620003,14.7645294 L0.363636364,14.4727273 C1.52728793,18.6064656 6.03760052,22.0830298 12,22.0830298 C14.8360738,22.0830298 17.3513084,21.1407038 19.0869993,19.5273569 L16.6129458,16.8987204 C15.4813053,17.5840845 13.7996977,18.1818182 12,18.1818182 C10.2545455,18.1818182 8.68590796,17.5874384 7.48599033,16.6109518 L4.0247678,19.4158822 C6.11533718,21.1527989 9.17110692,22.0909091 12,22.0909091 C13.8096365,22.0909091 15.4274078,21.5492146 16.7354905,20.6025646 L12,19.0909091 Z"></path>
                                        </svg>
                                    </span>
                                    <span>Sign in with Google</span>
                                </button>
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
