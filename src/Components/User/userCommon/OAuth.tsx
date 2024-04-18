import { Button } from '@nextui-org/react'
import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from '../../../firbase';
import { googleLogin } from '../../../Api/user';
import { useDispatch } from 'react-redux';
import { saveUser, setUserCredential } from '../../../app/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const auth = getAuth(app)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultsFromGoogle);
            if (resultsFromGoogle) {
                const result = await googleLogin(resultsFromGoogle.user.displayName, resultsFromGoogle.user.email, resultsFromGoogle.user.photoURL);
                if (result) {
                    dispatch(setUserCredential(result.data.token));
                    dispatch(saveUser(result.data.data));
                    navigate('/user/home');
                }
            }

        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <Button onClick={handleGoogleClick} type='button' className='bg-gradient-to-r from-red-500 to-orange-400 '>
            <AiFillGoogleCircle />
            Sign In with Google
        </Button>
    )
}

export default OAuth
