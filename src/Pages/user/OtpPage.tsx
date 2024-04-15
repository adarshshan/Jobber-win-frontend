import React, { useEffect, useState } from 'react';
import { verifyOtp } from '../../Api/user';
import { useNavigate } from 'react-router-dom';
import { setUserCredential } from '../../app/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';

const OTPComponent: React.FC = () => {
    const [otp, setOTP] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
   

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOTP(e.target.value);
    };

    const handleVerify = async () => {
        console.log("OTP:", otp);
        const result = await verifyOtp(otp);
        console.log(result);
        if (result?.data.data.success) {
            console.log(`everything is fine your token is `)
            console.log(result.data.data.token);
            dispatch(setUserCredential(result.data.data.token))
            navigate('/user')
        }
    }
    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full dark:bg-gray-900">
            <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
                <h1 className="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
                <p className="text-gray-600 text-center mb-4">Code sent to your Email</p>
                <div className="flex justify-center my-2">
                    <input
                        type="text"
                        value={otp}
                        onChange={handleOTPChange}
                        maxLength={6}
                        className="rounded-lg bg-gray-100 cursor-text dark:bg-gray-800  flex items-center justify-center text-gray-700 dark:text-gray-400 text-center outline-none"
                    />
                </div>
                <div className="flex items-center flex-col justify-between mb-6">
                    <p className="text-gray-600 text-sm">Didn't receive code?</p>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-blue-500">Request via Call</button>
                        <button className="px-3 py-2 text-sm font-medium text-center rounded text-gray-500 hover:text-blue-500">Request Again (00:00:36)</button>
                    </div>
                </div>
                <button onClick={handleVerify} className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Verify</button>
            </div>
        </div>
    );
}

export default OTPComponent;
