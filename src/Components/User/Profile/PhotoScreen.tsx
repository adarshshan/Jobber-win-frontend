import { UserData } from '@/components/user/ProfilePage';
import { removeProfilePic, setProfilePic } from 'Api/user';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoCameraSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
interface IPhotoScreenProps {
    setAddProfilescreen: React.Dispatch<React.SetStateAction<boolean>>;
    setPic: React.Dispatch<React.SetStateAction<string>>;
    userProfile: UserData | null;
    pic: string;
}

const PhotoScreen: React.FC<IPhotoScreenProps> = ({ setAddProfilescreen, setPic, userProfile, pic }) => {
    const [picMessages, setPicMessage] = useState('');
    const openGallery = () => {
        const butn = document.getElementById('openGallery');
        if (butn) butn.click();
    }
    const postDetails = (pics: File | null) => {
        if (!pics) return setPicMessage('Please Select an image!');
        setPicMessage('');
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'noteziper')
            data.append('cloud_name', 'dnn1ree80')
            fetch("https://api.cloudinary.com/v1_1/dnn1ree80/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {                                 
                    setPic(data.url.toString());
                    if (userProfile) setProfilePic(data.url.toString(), userProfile?._id).then((result) =>{
                        console.log(result);console.log('this is the image data');
                        setAddProfilescreen(false)
                    } );
                })
                .catch((err) => {
                    console.log(err);
                    setPicMessage('Somthing went wrong, please try again');
                });
        } else {
            setPicMessage('please select a valid image.');
        }
    }

    const handleDeleteProfilePic = async () => {
        try {
            const result = await removeProfilePic(userProfile?._id);
        } catch (error) {
            console.log(error as Error);
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 shadow-2xl rounded-2xl text-white w-full max-w-lg mx-auto p-4 sm:p-6">
                <div className="flex justify-between items-center text-xl sm:text-2xl">
                    <h1>Profile Photo</h1>
                    <IoMdClose onClick={() => setAddProfilescreen(false)} className="cursor-pointer" />
                </div>
                <p className="text-red-400 font-semibold my-4">{picMessages}</p>
                <div className="flex justify-center">
                    <img className="rounded-full w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 object-cover" src={pic.length ? pic : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} alt="Profile" />
                </div>
                <input type="file" id="openGallery" className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => postDetails(e.target.files?.[0] ?? null)} />
                <hr className="my-4" />
                <div className="flex justify-around text-lg sm:text-xl">
                    <div className="text-center cursor-pointer" onClick={openGallery}>
                        <IoCameraSharp className="text-3xl sm:text-4xl mx-auto" />
                        <p>Add Photo</p>
                    </div>
                    <div className="text-center cursor-pointer" onClick={handleDeleteProfilePic}>
                        <MdDelete className="text-3xl sm:text-4xl mx-auto" />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoScreen
