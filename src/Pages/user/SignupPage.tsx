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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState<number>(0)
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')

    const [nameErr, setNameErr] = useState('')
    const [phoneError, setPhoneError] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [locationErr, setLocationErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
    const [roleErr, setRoleErr] = useState('');

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const { userData } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (userData) navigate('/user/home');
    }, [userData]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErr('');
        try {
            if (!name.trim().length) {
                setErr('input fields must not be blank!');
                return;
            }
            if (!EMAIL_PATTERN.test(email.toString())) {
                setErr('Enter a valid Email.!');
                return;
            }
            if (!MOBILE_NUM_REGEX.test(phone.toString())) {
                setErr('Enter a valid phone number!');
                return;
            }
            if (!name.trim().length || !phone || !email.trim().length || !location.length || !password.length || !confirmPassword.length) {
                setErr('input fields must not be blank!');
                return;
            }
            if (!strongRegex.test(password)) {
                setErr('Your password is too weak, please enter a strong one.');
                return;
            }
            if (password.trim() !== confirmPassword.trim()) {
                setErr('Passwords are not matching!');
                return;
            }
            if (!role) {
                setErr('Please select the role!');
                return;
            }


            const formData = { name, email, location, phone, password, confirmPassword, role } as const;
            let result = await signup(formData);
            if (result) {
                navigate('/user/otp-page');
            }
        } catch (error) {
            console.log(error as Error);
        }
    }

    const isValidName = (): void => {
        const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
        !nameRegex.test(name) ? setNameErr('') : setNameErr('Enter your full name!');
        name.trim().length ? setNameErr('') : setNameErr('Input Field must not be blank!');
    }
    const validatePhone = () => {
        MOBILE_NUM_REGEX.test(phone.toString()) ? setPhoneError('') : setPhoneError('Enter a valid phone number.')
        !phone ? setPhoneError('input field must not be blank!') : setPasswordErr('');
    }
    const validatePassword = () => {
        strongRegex.test(password) ? setPasswordErr('') : setPasswordErr('password is too weak. make a strong one.');
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyUp={() => isValidName()}
                                        placeholder="Name"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{nameErr}</p>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyUp={() => EMAIL_PATTERN.test(email.toString()) ? setEmailErr('') : setEmailErr('Enter a valid Email Address!')}
                                        placeholder="Email"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{emailErr}</p>
                                    <input
                                        type="text"
                                        name="phone"
                                        onChange={(e) => setPhone(parseInt(e.target.value))}
                                        onKeyUp={() => validatePhone()}
                                        placeholder="Phone"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{phoneError}</p>
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onKeyUp={() => location.trim().length ? setLocationErr('') : setLocationErr('Input field must not be blank!')}
                                        placeholder="Location"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{locationErr}</p>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyUp={validatePassword}
                                        placeholder="Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{passwordErr}</p>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onKeyUp={() => password !== confirmPassword ? setConfirmPasswordErr('passwords are not matching!') : setConfirmPasswordErr('')}
                                        placeholder="Confirm Password"
                                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                                    />
                                    <p className="text-red-500">{confirmPasswordErr}</p>
                                    <select
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
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
